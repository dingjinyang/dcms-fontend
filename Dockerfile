FROM nginx
RUN mkdir /app
COPY ./dist /app/dcms-fontend
COPY nginx.conf /etc/nginx/nginx.conf