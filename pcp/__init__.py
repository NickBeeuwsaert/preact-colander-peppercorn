import datetime

from pyramid.authentication import SessionAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy
from pyramid.config import Configurator
from pyramid.renderers import JSON


def session_auth_callback(userid, request):
    user = request.db.query(User).filter(User.username == userid).first()

    if not user:
        return None

    return []


def main(global_config, **settings):
    config = Configurator(
        settings=settings
    )

    config.add_static_view(
        name='static',
        path='pcp:static'
    )

    config.include(
        'pcp.views',
        route_prefix='/'
    )

    return config.make_wsgi_app()
