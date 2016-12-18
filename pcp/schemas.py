from datetime import date

import colander


class ChapterSchema(colander.MappingSchema):
    title = colander.SchemaNode(colander.String())

class BookSchema(colander.MappingSchema):
    title = colander.SchemaNode(colander.String())
    author = colander.SchemaNode(colander.String())
    date_published = colander.SchemaNode(
        colander.Date(),
        validator=colander.Range(
            max=date.today(),
            max_err='Book can\' be published in the future'
        )
    )
    chapters = colander.SequenceSchema(ChapterSchema())

class BookListSchema(colander.MappingSchema):
    name = colander.SchemaNode(colander.String())
    books = colander.SequenceSchema(
        BookSchema(),
        validator=colander.Length(
            min=2,
            min_err='You need at least ${min} books'
        )
    )
