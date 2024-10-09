Các thư viện hiện có: React Navigation, Fontawesome icon, Realm, Realm/React, react-native-dotenv, react-native-autocomplete-input

1. Dùng lệnh npm i để tải các thư viện trước khi chạy dự án

2. Để chạy dự án, tải Android Studio và tạo 1 máy ảo (khuyến khích chọn SDK có API level cao), sau đó khởi động máy ảo và chạy lệnh npm run android
    2.1. Khi build có thể xuất hiện thông báo không tìm thấy Android SDK, vào thư mục android vừa được tạo trong project tạo file local.properties
    2.2. Vào Android Studio setting chọn SDK Manager sau đó copy đường dẫn Android SDK
    2.3. Trong file local.properties viết sdk.dir=[Đường dẫn Android SDK], lưu ý tạo escape sequence. Ví dụ: Đường dẫn Android SDK là C:\Users\Voke\AppData\Local\Android\Sdk thì ghi là C:\\Users\\Voke\\AppData\\Local\\Android\\Sdk
    2.4. Sau khi build dự án sẽ khởi động, xem terminal nếu không ở chế độ Android thì nhấn phím a để chuyển sang chế độ Android ở máy ảo

3. Các màn hình để trong thư mục screens và export default component đó ra sau đó import vào trong App.js

4. Trước khi bắt đầu code thực hiện git pull để kéo các code được người khác viết về trước

5. Sau khi code xong thực hiện lần lượt các lệnh sau để cập nhật lên GitHub
    git add .
    git commit -m "[thông tin về các thay đổi]"
    git pull
    git push

6. Nếu khi pull về xuất hiện thông báo conflict, hãy xem các file bị conflict và sửa sau đó thực hiện cập nhật lại lên GitHub, nếu không biết sửa thì lên nhóm thảo luận

7. Ghi API URL vào file .env
