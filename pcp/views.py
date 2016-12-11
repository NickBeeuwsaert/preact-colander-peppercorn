import logging
import pprint

from pyramid.view import view_config
import peppercorn

from pcp.schemas import BookListSchema

log = logging.getLogger(__name__)

@view_config(route_name='index', renderer='index.jinja2')
def index(request):
    book_list_schema = BookListSchema()

    if request.method == 'POST':
        pstruct = peppercorn.parse(request.POST.items())

        appstruct = book_list_schema.deserialize(pstruct)

        log.debug(pprint.format(appstruct))

        return dict(
            data=appstruct
        )
    return {}


def includeme(config):
    config.scan(__name__)

    config.add_route('index', '/')
