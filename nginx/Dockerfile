FROM nginx
EXPOSE 1000
WORKDIR /etc/nginx/
COPY ./certs/ ./certs/
COPY ./conf/nginx.conf ./nginx.conf
CMD ["nginx", "-g", "daemon off;"]