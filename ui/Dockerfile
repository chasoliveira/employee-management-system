FROM node:18-alpine AS BUILD_IMAGE

# Create a directory for your app
RUN mkdir /srv/app && chown node:node /srv/app

# Set the working directory
WORKDIR /srv/app
#copy package.json, vite.config.js, tsconfig.json, and other config files
COPY ./ui/package.json .
COPY ./ui/vite.config.ts .
COPY ./ui/tsconfig.json .
COPY ./ui/tsconfig.node.json .

# Install app dependencies
RUN npm i -g npm
RUN npm install --legacy-peer-deps

# Copy your app files
COPY ./ui .

# Build your app (if needed)
RUN npm run build

# ... previous Dockerfile content ...

# Start a new stage for the run image
FROM nginx:stable-alpine AS RUN_IMAGE

# Copy package.json and built files from the build image
COPY --from=BUILD_IMAGE /srv/app/dist /usr/share/nginx/html
COPY ./ui/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]