###################
# BUILD FOR BUILD 
###################

FROM node:21-alpine As build

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.

COPY --chown=node:node package*.json ./
COPY --chown=node:node . ./

RUN corepack enable
RUN corepack prepare pnpm@8.9.2 --activate

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN pnpm install

# Bundle app source

RUN node ./codeGenerator.js

# Use the node user from the image (instead of the root user)

# Run the build command which creates the production bundle
RUN pnpm run build

# Start with a base image
FROM nginx:latest


# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Copy the HTML source file from the host into the container
COPY --from=build /usr/src/app/dist .
COPY ./public/doc.html .

COPY nginx.conf /etc/nginx/nginx.conf   

# Expose port 80 for the NGINX server
EXPOSE 80
EXPOSE 443

# Start NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]
