FROM node:20

# install dumb init for signal passing
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64
RUN chmod +x /usr/local/bin/dumb-init

#copy in the package json to the app directory to run the install
# (this directory should be linked over with -v on run so you can live edit your code locally)
ADD ./package.json /root/package.json

# install npm modules
RUN cd /root; npm config set registry http://registry.npmjs.org/; npm install --save

# expose the port
EXPOSE 5000

# expose the http port
EXPOSE 80

#wire in a startup script
ADD bootstrap.sh /root/bootstrap.sh

CMD /root/bootstrap.sh

