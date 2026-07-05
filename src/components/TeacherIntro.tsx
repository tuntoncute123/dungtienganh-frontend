"use client";

import React from "react";

const InfoCheckIcon = () => (
  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="teacher-intro__svg-icon">
    <path d="M15.3253 6.78063C14.9932 6.45896 14.6599 6.1351 14.3253 5.80906C14.3159 5.35719 14.3042 4.90552 14.29 4.45406C14.2712 3.84938 14.0103 3.2725 13.5616 2.82406C13.1128 2.37563 12.535 2.11656 11.9306 2.0975C11.4781 2.08333 11.0256 2.07167 10.5731 2.0625C10.2473 1.73042 9.92333 1.39875 9.60125 1.0675C9.16906 0.622813 8.60687 0.374688 8.00875 0.375C7.41062 0.375313 6.84875 0.625 6.4175 1.0675C6.09521 1.39938 5.77073 1.73167 5.44406 2.06438C4.99156 2.07375 4.53917 2.08552 4.08687 2.09969C2.84094 2.14188 1.76844 3.21188 1.72594 4.45594C1.71177 4.9074 1.7001 5.35906 1.69094 5.81094C1.35781 6.13677 1.02458 6.46042 0.69125 6.78188C0.249063 7.2125 0 7.77406 0 8.37094C0 8.96781 0.2475 9.52719 0.69125 9.95906C1.02354 10.2803 1.35687 10.6032 1.69125 10.9278C1.70021 11.3799 1.71187 11.8319 1.72625 12.2837C1.74531 12.8897 2.0075 13.465 2.45438 13.9137C2.90125 14.3625 3.48094 14.6213 4.08719 14.6403C4.53969 14.6545 4.99229 14.6663 5.445 14.6756C5.77083 15.0071 6.09479 15.3384 6.41687 15.6697C6.84906 16.1144 7.41156 16.3625 8.01062 16.3625C8.60969 16.3625 9.17094 16.1144 9.60437 15.6703C9.92604 15.3386 10.2501 15.0066 10.5766 14.6741C11.0291 14.6647 11.4815 14.6529 11.9338 14.6388C13.1797 14.5963 14.2522 13.5253 14.2947 12.2825C14.3086 11.8308 14.3204 11.3793 14.33 10.9278C14.6633 10.602 14.996 10.2781 15.3281 9.95625C15.7691 9.52719 16.0184 8.96469 16.0181 8.37094C16.0178 7.77719 15.7691 7.21156 15.3253 6.78063Z" fill="#35a873" />
    <path d="M10.5731 2.0625C10.2473 1.73042 9.92333 1.39875 9.60125 1.0675C9.16906 0.622813 8.60687 0.374688 8.00875 0.375C7.41062 0.375313 6.84875 0.625 6.4175 1.0675C6.09521 1.39938 5.77073 1.73167 5.44406 2.06438C4.99156 2.07375 4.53917 2.08552 4.08687 2.09969C2.84094 2.14188 1.76844 3.21188 1.72594 4.45594C1.71177 4.9074 1.7001 5.35906 1.69094 5.81094C1.35781 6.13677 1.02458 6.46042 0.69125 6.78188C0.249063 7.2125 0 7.77406 0 8.37094C0 8.96781 0.2475 9.52719 0.69125 9.95906C1.02354 10.2803 1.35687 10.6032 1.69125 10.9278C1.69917 11.3184 1.70906 11.709 1.72094 12.0994C2.27069 12.2059 2.82939 12.2595 3.38937 12.2594C8.19844 12.2606 12.0975 8.36188 12.0975 3.5525C12.0976 3.06581 12.0572 2.57997 11.9766 2.1L11.9309 2.0975C11.4782 2.08354 11.0256 2.07188 10.5731 2.0625Z" fill="#35a873" />
    <path d="M11.9916 7.3558C10.6422 8.75798 9.27125 10.1914 7.92313 11.6133C7.81353 11.7293 7.68144 11.8218 7.53493 11.8851C7.38841 11.9484 7.23054 11.9812 7.07094 11.9814H7.06625C6.90679 11.9803 6.74916 11.9473 6.60265 11.8843C6.45614 11.8214 6.3237 11.7298 6.21313 11.6149C5.49229 10.8709 4.76917 10.1293 4.04375 9.39017C3.93406 9.27986 3.84752 9.14875 3.78921 9.00452C3.7309 8.8603 3.70201 8.70588 3.70422 8.55033C3.70643 8.39478 3.73971 8.24124 3.80209 8.09874C3.86448 7.95623 3.95472 7.82763 4.0675 7.72048C4.29473 7.50081 4.59953 7.37976 4.91556 7.38369C5.23159 7.38761 5.53329 7.51618 5.755 7.74142C6.18604 8.1833 6.6176 8.62642 7.04969 9.0708C8.12 7.94923 9.19563 6.8208 10.2544 5.71017C10.7038 5.23705 11.4534 5.22955 11.9353 5.6858C12.4172 6.14205 12.4444 6.88548 11.9916 7.3558Z" fill="white" />
  </svg>
);

export default function TeacherIntro() {
  return (
    <section className="home-page__teacher-intro">
      <div className="container">
        {/* Heading */}
        <div className="card_list_course__heading">
          <div className="card_list_course__heading___title">
            <div className="icon">
              <img
                src="/assets/green_avatar.png"
                alt="avatar"
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  objectFit: "cover",
                  display: "block"
                }}
              />
            </div>
            Giáo viên giảng dạy
          </div>
        </div>

        {/* Content body */}
        <div className="teacher-intro">
          {/* Avatar Area */}
          <div className="teacher-intro__left">
            <div className="teacher-intro__avatar-placeholder">
              <img
                loading="lazy"
                src="/assets/ceo_f668c601_v2.png"
                alt="Teacher Avatar"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>

          {/* Info Area */}
          <div className="teacher-intro__right">
            {/* Info Block */}
            <div className="teacher-intro__block">
              <h3 className="teacher-intro__title">Thông tin giáo viên</h3>
              <ul className="teacher-intro__list">
                <li>
                  <span className="teacher-intro__icon">
                    <InfoCheckIcon />
                  </span>
                  Tốt nghiệp loại giỏi ĐHSP TP.HCM, chuyên ngành Sư Phạm Tiếng Anh.
                </li>
                <li>
                  <span className="teacher-intro__icon">
                    <InfoCheckIcon />
                  </span>
                  Giáo viên Tiếng Anh đã đồng hành cùng hơn <strong>10.000 học sinh</strong> 2K8 và có hơn <strong>5.000 học sinh</strong> đăng ký tham gia các khoá học.
                </li>
                <li>
                  <span className="teacher-intro__icon">
                    <InfoCheckIcon />
                  </span>
                  Trong kỳ thi tuyển sinh 10, học sinh của cô đạt nhiều thành tích nổi bật với nhiều <strong>điểm 10 môn Tiếng Anh</strong>, cùng hàng trăm học sinh đạt từ <strong>9+</strong> và hàng nghìn học sinh đạt từ <strong>8+</strong>.
                </li>
              </ul>
            </div>

            {/* Style Block */}
            <div className="teacher-intro__block">
              <h3 className="teacher-intro__title">Phong cách giảng dạy</h3>
              <ul className="teacher-intro__list">
                <li>
                  <span className="teacher-intro__icon">
                    <InfoCheckIcon />
                  </span>
                  Bám sát chuẩn kiến thức và định hướng chương trình giáo dục mới, tập trung vào những nội dung trọng tâm giúp học sinh học hiệu quả.
                </li>
                <li>
                  <span className="teacher-intro__icon">
                    <InfoCheckIcon />
                  </span>
                  Phong cách giảng dạy nhiệt huyết, sáng tạo, chi tiết và dễ tiếp cận, phù hợp với nhiều trình độ, đặc biệt hỗ trợ tốt cho học sinh mất gốc hoặc cần củng cố nền tảng.
                </li>
                <li>
                  <span className="teacher-intro__icon">
                    <InfoCheckIcon />
                  </span>
                  Chú trọng giúp học sinh hiểu bản chất ngôn ngữ, phát triển tư duy học tập và khả năng vận dụng linh hoạt thay vì học thuộc máy móc.
                </li>
                <li>
                  <span className="teacher-intro__icon">
                    <InfoCheckIcon />
                  </span>
                  Kết hợp nhiều phương pháp học và mẹo làm bài hiệu quả, hỗ trợ học sinh mở rộng tư duy và nâng cao kỹ năng xử lý đề thi.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
