# Hồ Sơ Phân Tích, Thiết Kế 

## 1.1 Đối tượng & yêu cầu
    **Người dùng (user)**
        - Yêu cầu chức năng: Đọc, xem, đăng, bình luận, yêu thích, chia sẻ

    **Tác giả (author)**
        - Yêu cầu chức năng: Đăng bài, quản lý bài viết, chỉnh sửa, thêm, xóa bài viết, xem tương tác

    **Quản trị viên (admin)**
        - Yêu cầu chức năng: Quản lý người dùng, quản lý tác giả, quản lý bài viết

### 1.2 Các thực thể & thuộc tính các thực thể
    Thưc thể 1: Người dùng (user / admin)
        - Thuộc tính dự kiến: id_user, Tên User, Email, password, id_role
            - Trường nhập thủ công : Tên User, email, password
            - Trường duy nhất : email
            - Khóa chính : id_user
            - Khóa ngoại : id_role
    
    Thực thể 2: Tác giả (author)
        - Thuộc tính dự kiến: id_author, Nghệ danh, số điện thoại, id_role , id_user
            - Trường nhập thủ công : Nghệ danh, số điện thoại
            - Trường duy nhất : số điện thoại, nghệ danh, id_user
            - Khóa chính : id_author
            - Khóa ngoại : id_role , id_user
    
    Thực thể 3 : Bài viết (Blog)
        - Thuộc tính dự kiến: id_blog, tên blog, nội dung, view, id_author
            - Trường nhập thủ công: tên blog, nội dung
            - Khóa chính : id_blog
            - Khóa ngoại : id_author
        
    Thực thể 4 : Bình luận (Comments)
        - Thuộc tính dự kiến : id_comment, nội dung comment, ngày comments, id_blog, id_user, id_parent_comment
            - Trường nhập thủ công: nội dung comments
            - Khóa chính : id_comment
            - Khóa ngoại : id_blog, id_user, id_parent_comment
    
    Thực thể 5 : Quyền hạn (Role)
        - Thuộc tính dự kiến : id_role, Tên Role, mô tả chức năng
            - Trường nhập thủ công : Tên Role, mô tả chức năng
            - Khóa chính : id_role
    
    Thực thể 6 : Thể loại (Type Blog)
        - Thuộc tính dự kiến : id_type, Tên thể loại, mô tả, tổng bài viết
        - Trường nhập thủ công : Tên thể loại, mô tả
        - Khóa chính : id_type
    
    Thực thể 7 : Danh sách Blog theo thể loại (List_Blog_By_Type)
        - Thuộc tính dự kiến : id_blog, id_type
        - Khóa chính : id_blog, id_type
        - Khóa ngoại : id_blog, id_type