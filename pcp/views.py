import logging
import pprint

import colander
import peppercorn
from pyramid.view import view_config, view_defaults

from pcp.schemas import BookListSchema
from pcp.form import Form, FormException

log = logging.getLogger(__name__)


@view_defaults(
    route_name='index',
    renderer='index.jinja2'
)
class FormView(object):
    def __init__(self, request):
        self.request = request

    @view_config(request_method='POST')
    def post_index(self):
        pstruct = peppercorn.parse(self.request.POST.items())
        form = Form(BookListSchema())
        try:
            data = form.validate(pstruct)

            log.info(data)
        except FormException as e:
            return dict(
                data=pstruct,
                errors=e.prepare()
            )

        return dict(
            data=pstruct
        )

    @view_config(request_method='GET')
    def get_index(self):
        return dict(
            data={}
        )

def includeme(config):
    config.scan(__name__)

    config.add_route('index', '/')
