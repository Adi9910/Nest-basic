FROM node:20.11.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build
EXPOSE 2200
CMD ["pnpm", "run", "start:nodemon"]


# image create
#  docker build --no-cache .\first-app\ -t nest1:latest      
# container run
# docker run --name nestify -p 3000:2200/tcp -d nest1:latest

#use alpine for smaller image size
# always check ports, app post === expose port 3200 is app port 3000 run port.