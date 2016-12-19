import colander

class FormException(Exception):
    def __init__(self, exc):
        self.exc = exc

    def prepare(self):
        def traverse(exc):
            return dict(
                errors=[
                    s.interpolate() if hasattr(s, 'interpolate')
                    else s
                    for s in exc.messages()
                ],
                children={
                    child.pos if child.positional
                    else child.node.name: traverse(child)
                    for child in exc.children
                }
            )

        return traverse(self.exc)

class Form(object):
    def __init__(self, schema):
        self.schema = schema

    def validate(self, pstruct):
        try:
            appstruct = self.schema.deserialize(pstruct)
        except colander.Invalid as exc:
            raise FormException(exc) from exc

        return appstruct