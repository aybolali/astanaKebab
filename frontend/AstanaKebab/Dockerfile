FROM node:20 AS build
WORKDIR /app

#install dependencies
COPY package*.json ./
RUN npm install

# Copy the whole application code
COPY . .
RUN npm run build 

# Serve Stage
FROM nginx:stable-alpine
COPY --from=build /app/dist/angular-commerce /usr/share/nginx/html

EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]

