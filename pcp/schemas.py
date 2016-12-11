import colander

class ChapterSchema(colander.MappingSchema):
    title = colander.SchemaNode(colander.String())

class BookSchema(colander.MappingSchema):
    title = colander.SchemaNode(colander.String())
    chapters = colander.SequenceSchema(ChapterSchema())

class BookListSchema(colander.MappingSchema):
    name = colander.SchemaNode(colander.String())
    books = colander.SequenceSchema(BookSchema())
