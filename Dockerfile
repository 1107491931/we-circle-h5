# Zeabur Deployment
FROM nginx:alpine

# 删除默认配置
RUN rm /etc/nginx/conf.d/default.conf

# 拷贝自定义 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 拷贝静态资源
COPY . /usr/share/nginx/html

EXPOSE 80
