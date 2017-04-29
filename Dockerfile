FROM node:6.2.0
EXPOSE 5002

# Create app directory
ADD . /code
WORKDIR /code

RUN npm install

#CMD ["sleep", "infinity"]
CMD ["npm", "start"]

