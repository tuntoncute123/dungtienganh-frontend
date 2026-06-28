"use client";

import React from "react";

const InfoCheckIcon = () => (
  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="teacher-intro__svg-icon">
    <path d="M15.3253 6.78063C14.9932 6.45896 14.6599 6.1351 14.3253 5.80906C14.3159 5.35719 14.3042 4.90552 14.29 4.45406C14.2712 3.84938 14.0103 3.2725 13.5616 2.82406C13.1128 2.37563 12.535 2.11656 11.9306 2.0975C11.4781 2.08333 11.0256 2.07167 10.5731 2.0625C10.2473 1.73042 9.92333 1.39875 9.60125 1.0675C9.16906 0.622813 8.60687 0.374688 8.00875 0.375C7.41062 0.375313 6.84875 0.625 6.4175 1.0675C6.09521 1.39938 5.77073 1.73167 5.44406 2.06438C4.99156 2.07375 4.53917 2.08552 4.08687 2.09969C2.84094 2.14188 1.76844 3.21188 1.72594 4.45594C1.71177 4.9074 1.7001 5.35906 1.69094 5.81094C1.35781 6.13677 1.02458 6.46042 0.69125 6.78188C0.249063 7.2125 0 7.77406 0 8.37094C0 8.96781 0.2475 9.52719 0.69125 9.95906C1.02354 10.2803 1.35687 10.6032 1.69125 10.9278C1.70021 11.3799 1.71187 11.8319 1.72625 12.2837C1.74531 12.8897 2.0075 13.465 2.45438 13.9137C2.90125 14.3625 3.48094 14.6213 4.08719 14.6403C4.53969 14.6545 4.99229 14.6663 5.445 14.6756C5.77083 15.0071 6.09479 15.3384 6.41687 15.6697C6.84906 16.1144 7.41156 16.3625 8.01062 16.3625C8.60969 16.3625 9.17094 16.1144 9.60437 15.6703C9.92604 15.3386 10.2501 15.0066 10.5766 14.6741C11.0291 14.6647 11.4815 14.6529 11.9338 14.6388C13.1797 14.5963 14.2522 13.5253 14.2947 12.2825C14.3086 11.8308 14.3204 11.3793 14.33 10.9278C14.6633 10.602 14.996 10.2781 15.3281 9.95625C15.7691 9.52719 16.0184 8.96469 16.0181 8.37094C16.0178 7.77719 15.7691 7.21156 15.3253 6.78063Z" fill="#0C69EA" />
    <path d="M10.5731 2.0625C10.2473 1.73042 9.92333 1.39875 9.60125 1.0675C9.16906 0.622813 8.60687 0.374688 8.00875 0.375C7.41062 0.375313 6.84875 0.625 6.4175 1.0675C6.09521 1.39938 5.77073 1.73167 5.44406 2.06438C4.99156 2.07375 4.53917 2.08552 4.08687 2.09969C2.84094 2.14188 1.76844 3.21188 1.72594 4.45594C1.71177 4.9074 1.7001 5.35906 1.69094 5.81094C1.35781 6.13677 1.02458 6.46042 0.69125 6.78188C0.249063 7.2125 0 7.77406 0 8.37094C0 8.96781 0.2475 9.52719 0.69125 9.95906C1.02354 10.2803 1.35687 10.6032 1.69125 10.9278C1.69917 11.3184 1.70906 11.709 1.72094 12.0994C2.27069 12.2059 2.82939 12.2595 3.38937 12.2594C8.19844 12.2606 12.0975 8.36188 12.0975 3.5525C12.0976 3.06581 12.0572 2.57997 11.9766 2.1L11.9309 2.0975C11.4782 2.08354 11.0256 2.07188 10.5731 2.0625Z" fill="#0C69EA" />
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
              <svg width="26" height="26" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 6.375C16 8.58414 14.2091 10.375 12 10.375C9.79086 10.375 8 8.58414 8 6.375C8 4.16586 9.79086 2.375 12 2.375C14.2091 2.375 16 4.16586 16 6.375Z" fill="#0C69EA" />
                <path d="M15.6782 13.8778C15.2051 13.8835 14.7642 13.9008 14.3799 13.9524C13.737 14.0389 13.0334 14.2455 12.4519 14.8269C11.8705 15.4083 11.6639 16.112 11.5775 16.7549C11.4998 17.3326 11.4999 18.0385 11.5 18.789V18.961C11.4999 19.7115 11.4998 20.4174 11.5 20.9951C11.6381 21.4462 11.7579 21.9272 12.0249 22.375C12.0166 22.375 12.0083 22.375 12 22.375C4 22.375 4 20.3603 4 17.875C4 15.3897 7.58172 13.375 12 13.375C13.3262 13.375 14.577 13.5565 15.6782 13.8778Z" fill="#0C69EA" />
                <path fillRule="evenodd" clipRule="evenodd" d="M13.5126 21.8624C14.0251 22.375 14.8501 22.375 16.5 22.375C18.1499 22.375 18.9749 22.375 19.4874 21.8624C20 21.3499 20 20.5249 20 18.875C20 17.2251 20 16.4001 19.4874 15.8876C18.9749 15.375 18.1499 15.375 16.5 15.375C14.8501 15.375 14.0251 15.375 13.5126 15.8876C13 16.4001 13 17.2251 13 18.875C13 20.5249 13 21.3499 13.5126 21.8624ZM15.5266 20.3515C14.8245 19.8488 14 19.2583 14 18.2348C14 17.1049 15.375 16.3035 16.5 17.3898C17.625 16.3035 19 17.1049 19 18.2348C19 19.2583 18.1755 19.8488 17.4734 20.3515C17.4005 20.4037 17.3288 20.455 17.2596 20.5058C17 20.6959 16.75 20.875 16.5 20.875C16.25 20.875 16 20.6959 15.7404 20.5058C15.6712 20.455 15.5995 20.4037 15.5266 20.3515Z" fill="#0C69EA" />
              </svg>
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
                src="/assets/ceo_f668c601.png"
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
                  Có hơn <strong>40.000 học sinh</strong> 2K7, <strong>15.000 học sinh</strong> 2K6 và <strong>7000 học sinh</strong> 2K6 đã đăng ký khoá học.
                </li>
                <li>
                  <span className="teacher-intro__icon">
                    <InfoCheckIcon />
                  </span>
                  Trong kỳ thi THPTQG 2025, anh Kid có học sinh đạt điểm 10 Toán và hàng trăm học sinh đạt điểm 9+, hàng nghìn học sinh đạt điểm 8+.
                </li>
                <li>
                  <span className="teacher-intro__icon">
                    <InfoCheckIcon />
                  </span>
                  Giáo viên có lượt xem <strong>livestream đạt TOP ĐẦU</strong> trên các nền tảng Facebook và Tiktok trong 3 năm liên tiếp 2023,2024,2025.
                </li>
                <li>
                  <span className="teacher-intro__icon">
                    <InfoCheckIcon />
                  </span>
                  <strong>Trao quỹ học bổng 800.000.000 Vnd</strong> dành cho học sinh 2K7 đạt thành tích cao trong kỳ thi THPTQG 2025.
                </li>
                <li>
                  <span className="teacher-intro__icon">
                    <InfoCheckIcon />
                  </span>
                  2 Năm liền trao <strong>tặng quỹ học bổng trị giá 20.000.000 Vnd</strong> cho học sinh trường THPT Xuân Đỉnh.
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
                  Dạy đúng trọng tâm và chuẩn cấu trúc chương trình mới.
                </li>
                <li>
                  <span className="teacher-intro__icon">
                    <InfoCheckIcon />
                  </span>
                  Năng động, sáng tạo, chi tiết, chậm rãi, phù hợp với tất cả các học sinh, đặc biệt là học sinh mất gốc.
                </li>
                <li>
                  <span className="teacher-intro__icon">
                    <InfoCheckIcon />
                  </span>
                  Đi sâu vào bản chất, rèn luyện tư duy để có thể xử lý bài toán linh hoạt, không máy móc.
                </li>
                <li>
                  <span className="teacher-intro__icon">
                    <InfoCheckIcon />
                  </span>
                  Kết hợp dạy Casio để bổ trợ đa dạng kiến thức và cách làm các bài toán.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
