# User & Role Management System

Hệ thống quản lý User và Role với MongoDB, Express, và giao diện HTML/CSS/JS.

## Cài đặt và Chạy

### 1. Khởi động MongoDB trong Docker

```bash
docker-compose up -d
```

### 2. Cài đặt dependencies cho server

```bash
cd server
npm install
```

### 3. Chạy server

```bash
npm start
```

Server sẽ chạy tại: http://localhost:3000

### 4. Mở giao diện

Truy cập: http://localhost:3000

## API Endpoints

### Users
- `POST /api/users` - Tạo user mới
- `GET /api/users` - Lấy tất cả users
- `GET /api/users/:id` - Lấy user theo ID
- `PUT /api/users/:id` - Cập nhật user
- `DELETE /api/users/:id` - Xóa mềm user
- `POST /api/users/enable` - Enable user (body: {email, username})
- `POST /api/users/disable` - Disable user (body: {email, username})

### Roles
- `POST /api/roles` - Tạo role mới
- `GET /api/roles` - Lấy tất cả roles
- `GET /api/roles/:id` - Lấy role theo ID
- `PUT /api/roles/:id` - Cập nhật role

## Tính năng

- CRUD operations cho User và Role
- Soft delete cho User
- Enable/Disable user status
- Giao diện web đơn giản để quản lý
- MongoDB chạy trong Docker container
