
# use official node image for the base image
FROM node:20  

# set the working directory in the container
WORKDIR /app

COPY  package*.json ./

RUN npm install

COPY . .

EXPOSE 5002

# Start development server
CMD ["npm", "run", "dev"]
    