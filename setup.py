from setuptools import setup

setup(
    name='pcp',
    version='0.0.0',
    author='Nick Beeuwsaert',
    license='MIT',
    packages=[
        'pcp'
    ],
    install_requires=[
        'pyramid',
        'pyramid-jinja2',
        'colander',
        'peppercorn'
    ],
    extras_require={
        'dev': [
            'pyramid-debugtoolbar'
        ]
    },
    entry_points={
        'paste.app_factory': [
            'main = pcp:main'
        ]
    }
)