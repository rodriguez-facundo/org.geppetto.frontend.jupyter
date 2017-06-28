import setuptools
from glob import glob

#This block copies resources to the server (/usr/local/share/jupyter/nbextensions/)
data_files = []
# data_files.append(('share/jupyter/nbextensions/geppettoJupyter', glob('src/geppettoJupyter/*.js')))
# data_files.append(('share/jupyter/nbextensions/geppettoJupyter', glob('src/geppettoJupyter/*.css')))


data_files.append(('share/jupyter/nbextensions/jupyter_geppetto', glob('src/jupyter_geppetto/geppetto/src/main/webapp/build/*.js')))
data_files.append(('share/jupyter/nbextensions/jupyter_geppetto', glob('src/jupyter_geppetto/geppetto/src/main/webapp/build/*.vm')))
data_files.append(('share/jupyter/nbextensions/jupyter_geppetto', glob('src/jupyter_geppetto/geppetto/src/main/webapp/build/fonts/*')))

# data_files.append(('share/jupyter/nbextensions/geppettoJupyter', glob('src/geppettoJupyter/geppetto_comm/*')))
data_files.append(('share/jupyter/nbextensions/jupyter_geppetto', glob('src/jupyter_geppetto/geppettoJupyter.css')))
data_files.append(('share/jupyter/nbextensions/jupyter_geppetto', glob('src/jupyter_geppetto/GeppettoJupyter.js')))
data_files.append(('share/jupyter/nbextensions/jupyter_geppetto', glob('src/jupyter_geppetto/index.js')))
data_files.append(('share/jupyter/nbextensions/jupyter_geppetto', glob('src/jupyter_geppetto/overwrite_get_msg_cell.js')))

setuptools.setup(
    name="jupyter_geppetto",
    version="0.3.6",
    url="https://github.com/openworm/org.geppetto.frontend.jupyter",
    author="The Geppetto Development Team",
    author_email="info@geppetto.org",
    description="Geppetto extension for Jupyter notebook",
    license="MIT",
    long_description=open('README.rst').read(),
    packages=setuptools.find_packages('src'),
    package_dir={'': 'src'},
    data_files=data_files,
    include_package_data=True,
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Science/Research',
        'Topic :: Scientific/Engineering :: Visualization',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4'
    ],
    install_requires=[
        'ipywidgets>=5.1.5, <6.0'
    ],
)
