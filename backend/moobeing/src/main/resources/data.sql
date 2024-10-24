-- 1. 맴버 생성
INSERT IGNORE INTO member (member_id, email, password, total_points, total_loan, name, gender, birthday, user_key, selected_radish_id, month_aver, month_complete, good_member)
VALUES (1, 'test@gmail.com', 'test', 0, 0, '김몰리', 'M', '000101', 'user_key_123', 1, 2000000, false, false);

-- 2. 대출 상품 더미 데이터 12개 생성
INSERT IGNORE INTO loan_product (loan_product_id, loan_name, bank_image_url, bank_name, loan_period, interest_rate, description) VALUES
(1, '우리은행 주택담보대출', 'https://github.com/user-attachments/assets/0fe19810-9646-4beb-bfc3-e3e15b69f6c1', '우리은행', 240, 2.5, '우리은행의 주택담보대출 상품입니다.'),
(2, '신한은행 직장인대출', 'https://github.com/user-attachments/assets/fa2aedb1-6886-4982-84f3-6e773fed7792', '신한은행', 60, 3.2, '신한은행의 직장인을 위한 대출 상품입니다.'),
(3, 'IBK기업은행 중소기업대출', 'https://github.com/user-attachments/assets/a723840f-838b-4160-9e96-18daf28fe7ba', 'IBK기업은행', 120, 3.8, 'IBK기업은행의 중소기업을 위한 대출 상품입니다.'),
(4, 'KB국민은행 전세자금대출', 'https://github.com/user-attachments/assets/16e42300-e535-46c6-b184-2e8f1f891dc0', 'KB국민은행', 36, 2.7, 'KB국민은행의 전세자금대출 상품입니다.'),
(5, '하나은행 생활안정대출', 'https://github.com/user-attachments/assets/c1f2b5aa-0bb9-46c6-ab08-cafcd29dba73', '하나은행', 48, 4.0, '하나은행의 생활안정을 위한 대출 상품입니다.'),
(6, '카카오뱅크 비상금대출', 'https://github.com/user-attachments/assets/ef5ec69e-abe0-4fae-85e9-8b3bf541e607', '카카오뱅크', 12, 3.0, '카카오뱅크의 비상시에 사용할 수 있는 소액 대출 상품입니다.'),
(7, '우리은행 자영업자대출', 'https://github.com/user-attachments/assets/0fe19810-9646-4beb-bfc3-e3e15b69f6c1', '우리은행', 72, 4.2, '우리은행의 자영업자를 위한 대출 상품입니다.'),
(8, '신한은행 신용대출', 'https://github.com/user-attachments/assets/fa2aedb1-6886-4982-84f3-6e773fed7792', '신한은행', 36, 3.5, '신한은행의 신용대출 상품입니다.'),
(9, 'IBK기업은행 창업대출', 'https://github.com/user-attachments/assets/a723840f-838b-4160-9e96-18daf28fe7ba', 'IBK기업은행', 84, 4.1, 'IBK기업은행의 창업 지원을 위한 대출 상품입니다.'),
(10, 'KB국민은행 자동차구입대출', 'https://github.com/user-attachments/assets/16e42300-e535-46c6-b184-2e8f1f891dc0', 'KB국민은행', 60, 3.9, 'KB국민은행의 자동차 구입을 위한 대출 상품입니다.'),
(11, '하나은행 교육비대출', 'https://github.com/user-attachments/assets/c1f2b5aa-0bb9-46c6-ab08-cafcd29dba73', '하나은행', 48, 2.9, '하나은행의 교육비 지원을 위한 대출 상품입니다.'),
(12, '카카오뱅크 청년대출', 'https://github.com/user-attachments/assets/ef5ec69e-abe0-4fae-85e9-8b3bf541e607', '카카오뱅크', 120, 2.3, '카카오뱅크의 청년을 위한 장기 대출 상품입니다.'),
(13, '신한은행 전세자금대출', 'https://github.com/user-attachments/assets/fa2aedb1-6886-4982-84f3-6e773fed7792', '신한은행', 60, 3.2, '전세자금의 최대 85% 까지 대출 가능한 주택자금 서비스.');

-- 3. test@gmail.com으로 대출 상품 5개 가입시키기
INSERT IGNORE INTO member_loan (member_loan_id, member_id, loan_product_name, status, initial_balance, remaining_balance, repayment_deadline, withdrawal_account_no, start_year, start_month, start_day) VALUES
(1, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), '우리은행 주택담보대출', 'Active', 1000000, 861110, '2025-01-01', '123-456-789', 2024, 1, 1),
(2, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), '신한은행 직장인대출', 'Active', 2000000, 1722220, '2025-02-01', '123-456-789', 2024, 2, 1),
(3, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 'IBK기업은행 중소기업대출', 'Active', 3000000, 2583335, '2025-03-01', '123-456-789', 2024, 3, 1),
(4, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 'KB국민은행 전세자금대출', 'Active', 4000000, 3444445, '2025-04-01', '123-456-789', 2024, 4, 1),
(5, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), '하나은행 생활안정대출', 'Active', 5000000, 4305555, '2025-05-01', '123-456-789', 2024, 5, 1),
(6, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), '신한은행 전세자금대출', 'Active', 400000000, 332160000, '2039-08-01', '123-456-789', 2019, 8, 1);

INSERT IGNORE INTO average_loan_repayment_record (average_loan_repayment_record_id, loan_name, age, month, repayment_balance) VALUES
-- 우리은행 주택담보대출
(1, '우리은행 주택담보대출', '00', 1, 1000000),
(2, '우리은행 주택담보대출', '00', 2, 960000),
(3, '우리은행 주택담보대출', '00', 3, 920000),
(4, '우리은행 주택담보대출', '00', 4, 880000),
(5, '우리은행 주택담보대출', '00', 5, 840000),
(6, '우리은행 주택담보대출', '00', 6, 800000),
(7, '우리은행 주택담보대출', '00', 7, 760000),
(8, '우리은행 주택담보대출', '00', 8, 720000),
(9, '우리은행 주택담보대출', '00', 9, 680000),
(10, '우리은행 주택담보대출', '00', 10, 640000),
(11, '우리은행 주택담보대출', '00', 11, 600000),
(12, '우리은행 주택담보대출', '00', 12, 560000),

-- 신한은행 직장인대출
(13, '신한은행 직장인대출', '00', 1, 2000000),
(14, '신한은행 직장인대출', '00', 2, 1900000),
(15, '신한은행 직장인대출', '00', 3, 1800000),
(16, '신한은행 직장인대출', '00', 4, 1700000),
(17, '신한은행 직장인대출', '00', 5, 1600000),
(18, '신한은행 직장인대출', '00', 6, 1500000),
(19, '신한은행 직장인대출', '00', 7, 1400000),
(20, '신한은행 직장인대출', '00', 8, 1300000),
(21, '신한은행 직장인대출', '00', 9, 1200000),
(22, '신한은행 직장인대출', '00', 10, 1100000),
(23, '신한은행 직장인대출', '00', 11, 1000000),
(24, '신한은행 직장인대출', '00', 12, 900000),

-- IBK기업은행 중소기업대출
(25, 'IBK기업은행 중소기업대출', '00', 1, 3000000),
(26, 'IBK기업은행 중소기업대출', '00', 2, 2850000),
(27, 'IBK기업은행 중소기업대출', '00', 3, 2700000),
(28, 'IBK기업은행 중소기업대출', '00', 4, 2550000),
(29, 'IBK기업은행 중소기업대출', '00', 5, 2400000),
(30, 'IBK기업은행 중소기업대출', '00', 6, 2250000),
(31, 'IBK기업은행 중소기업대출', '00', 7, 2100000),
(32, 'IBK기업은행 중소기업대출', '00', 8, 1950000),
(33, 'IBK기업은행 중소기업대출', '00', 9, 1800000),
(34, 'IBK기업은행 중소기업대출', '00', 10, 1650000),
(35, 'IBK기업은행 중소기업대출', '00', 11, 1500000),
(36, 'IBK기업은행 중소기업대출', '00', 12, 1350000),

-- KB국민은행 전세자금대출
(37, 'KB국민은행 전세자금대출', '00', 1, 4000000),
(38, 'KB국민은행 전세자금대출', '00', 2, 3800000),
(39, 'KB국민은행 전세자금대출', '00', 3, 3600000),
(40, 'KB국민은행 전세자금대출', '00', 4, 3400000),
(41, 'KB국민은행 전세자금대출', '00', 5, 3200000),
(42, 'KB국민은행 전세자금대출', '00', 6, 3000000),
(43, 'KB국민은행 전세자금대출', '00', 7, 2800000),
(44, 'KB국민은행 전세자금대출', '00', 8, 2600000),
(45, 'KB국민은행 전세자금대출', '00', 9, 2400000),
(46, 'KB국민은행 전세자금대출', '00', 10, 2200000),
(47, 'KB국민은행 전세자금대출', '00', 11, 2000000),
(48, 'KB국민은행 전세자금대출', '00', 12, 1800000),

-- 하나은행 생활안정대출
(49, '하나은행 생활안정대출', '00', 1, 5000000),
(50, '하나은행 생활안정대출', '00', 2, 4700000),
(51, '하나은행 생활안정대출', '00', 3, 4400000),
(52, '하나은행 생활안정대출', '00', 4, 4100000),
(53, '하나은행 생활안정대출', '00', 5, 3800000),
(54, '하나은행 생활안정대출', '00', 6, 3500000),
(55, '하나은행 생활안정대출', '00', 7, 3200000),
(56, '하나은행 생활안정대출', '00', 8, 2900000),
(57, '하나은행 생활안정대출', '00', 9, 2600000),
(58, '하나은행 생활안정대출', '00', 10, 2300000),
(59, '하나은행 생활안정대출', '00', 11, 2000000),
(60, '하나은행 생활안정대출', '00', 12, 1700000),

-- 신한은행 전세자금 대출
(61, '신한은행 전세자금대출', '00', 1, 400000000),
(62, '신한은행 전세자금대출', '00', 2, 397000000),
(63, '신한은행 전세자금대출', '00', 3, 394000000),
(64, '신한은행 전세자금대출', '00', 4, 391000000),
(65, '신한은행 전세자금대출', '00', 5, 388000000),
(66, '신한은행 전세자금대출', '00', 6, 385000000),
(67, '신한은행 전세자금대출', '00', 7, 382000000),
(68, '신한은행 전세자금대출', '00', 8, 379000000),
(69, '신한은행 전세자금대출', '00', 9, 376000000),
(70, '신한은행 전세자금대출', '00', 10, 373000000),
(71, '신한은행 전세자금대출', '00', 11, 370000000),
(72, '신한은행 전세자금대출', '00', 12, 367000000),
(73, '신한은행 전세자금대출', '00', 13, 364000000),
(74, '신한은행 전세자금대출', '00', 14, 361000000),
(75, '신한은행 전세자금대출', '00', 15, 358000000),
(76, '신한은행 전세자금대출', '00', 16, 355000000),
(77, '신한은행 전세자금대출', '00', 17, 352000000),
(78, '신한은행 전세자금대출', '00', 18, 349000000),
(79, '신한은행 전세자금대출', '00', 19, 346000000),
(80, '신한은행 전세자금대출', '00', 20, 343000000),
(81, '신한은행 전세자금대출', '00', 21, 340000000),
(82, '신한은행 전세자금대출', '00', 22, 337000000),
(83, '신한은행 전세자금대출', '00', 23, 334000000),
(84, '신한은행 전세자금대출', '00', 24, 331000000),
(85, '신한은행 전세자금대출', '00', 25, 328000000),
(86, '신한은행 전세자금대출', '00', 26, 325000000),
(87, '신한은행 전세자금대출', '00', 27, 322000000),
(88, '신한은행 전세자금대출', '00', 28, 319000000),
(89, '신한은행 전세자금대출', '00', 29, 316000000),
(90, '신한은행 전세자금대출', '00', 30, 313000000),
(91, '신한은행 전세자금대출', '00', 31, 310000000),
(92, '신한은행 전세자금대출', '00', 32, 307000000),
(93, '신한은행 전세자금대출', '00', 33, 304000000),
(94, '신한은행 전세자금대출', '00', 34, 301000000),
(95, '신한은행 전세자금대출', '00', 35, 298000000),
(96, '신한은행 전세자금대출', '00', 36, 295000000),
(97, '신한은행 전세자금대출', '00', 37, 292000000),
(98, '신한은행 전세자금대출', '00', 38, 289000000),
(99, '신한은행 전세자금대출', '00', 39, 286000000),
(100, '신한은행 전세자금대출', '00', 40, 283000000),
(101, '신한은행 전세자금대출', '00', 41, 280000000),
(102, '신한은행 전세자금대출', '00', 42, 277000000),
(103, '신한은행 전세자금대출', '00', 43, 274000000),
(104, '신한은행 전세자금대출', '00', 44, 271000000),
(105, '신한은행 전세자금대출', '00', 45, 268000000),
(106, '신한은행 전세자금대출', '00', 46, 265000000),
(107, '신한은행 전세자금대출', '00', 47, 262000000),
(108, '신한은행 전세자금대출', '00', 48, 259000000),
(109, '신한은행 전세자금대출', '00', 49, 256000000),
(110, '신한은행 전세자금대출', '00', 50, 253000000),
(111, '신한은행 전세자금대출', '00', 51, 250000000),
(112, '신한은행 전세자금대출', '00', 52, 247000000),
(113, '신한은행 전세자금대출', '00', 53, 244000000),
(114, '신한은행 전세자금대출', '00', 54, 241000000),
(115, '신한은행 전세자금대출', '00', 55, 238000000),
(116, '신한은행 전세자금대출', '00', 56, 235000000),
(117, '신한은행 전세자금대출', '00', 57, 232000000),
(118, '신한은행 전세자금대출', '00', 58, 229000000),
(119, '신한은행 전세자금대출', '00', 59, 226000000),
(120, '신한은행 전세자금대출', '00', 60, 223000000),
(121, '신한은행 전세자금대출', '00', 61, 220000000);


-- 5. radish 테이블에 데이터 삽입 (이미 존재할 경우 삽입 무시)
INSERT IGNORE INTO radish (radish_id, radish_name, radish_image_url, radish_rank, created_date, modified_date, radish_message) VALUES
(1, '무', 'https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9', 'A', '2024-08-23 12:00:00', '2024-08-23 12:00:00', '무빙 회사에 재직 중인 무다. 일도 잘하고 성격도 좋아 모두가 좋아하는 멋진 상사다.'),
(2, '아련하무', 'https://github.com/user-attachments/assets/989d6ac6-39d1-4f24-85aa-ac2c6deedc4c', 'A', '2024-08-23 12:05:00', '2024-08-23 12:05:00', '무들 사이에서 미모로 유명하다. 성격도 착해서 남녀노소 모두에게 인기가 많다.'),
(3, '응애무', 'https://github.com/user-attachments/assets/33f17ce2-5155-4d8a-8b63-0526e4c241a3', 'B', '2024-08-23 12:10:00', '2024-08-23 12:10:00', '아직 걸음마를 떼지 못한 아기 무다. 5개를 모아 무를 성장시켜보자.'),
(4, '발그레무', 'https://github.com/user-attachments/assets/29766555-5bb9-4848-88c3-79039ecaa61a', 'A', '2024-08-23 12:15:00', '2024-08-23 12:15:00', '부끄럼이 많아 항상 얼굴에 홍조가 있다. 심하게 부끄러울 때는 온몸이 붉게 물든다.'),
(5, '물구나무', 'https://github.com/user-attachments/assets/55610e6e-e7a0-41f9-b81a-d41ce79bdbe8', 'S', '2024-08-23 12:20:00', '2024-08-23 12:20:00', '거꾸로 다니는 것이 특징. 항상 머리가 거꾸로 쏠려 있어 고혈압으로 고생 중이다.'),
(6, '머리숱많아무', 'https://github.com/user-attachments/assets/474185cd-9469-4394-a0b9-48fd189b66d4', 'A', '2024-08-23 12:25:00', '2024-08-23 12:25:00', '아름다운 머릿결을 가진 무이다. 지나갈 때마다 상쾌한 샴푸 냄새가 난다.'),
(7, '무신사', 'https://github.com/user-attachments/assets/5a28373c-c434-4d2b-8df9-27dc48c6df05', 'S', '2024-08-23 12:30:00', '2024-08-23 12:30:00', '매우 신사적인 무다. 매일 아침 철저한 수염 관리 루틴을 가지고 있다.'),
(8, '무지개', 'https://github.com/user-attachments/assets/28b348f4-cd9e-4a65-9390-49bec79af10f', 'A', '2024-08-23 12:40:00', '2024-08-23 12:40:00', '비가 온 후 몸의 색이 무지개처럼 변한다.'),
(9, '무급휴가', 'https://github.com/user-attachments/assets/0bd57d4a-f59f-4cdc-ba71-5ce07a37bf9e', 'A', '2024-08-23 12:50:00', '2024-08-23 12:50:00', '무급휴가 중인 무다.'),
(10, '무산소', 'https://github.com/user-attachments/assets/eb74b691-4b58-4532-bf7d-087bc944a844', 'A', '2024-08-23 12:55:00', '2024-08-23 12:55:00', '헬스장 가는 것이 삶의 낙인 무이다. 유산소는 좋아하지 않는다.');

-- Loan Product 1 상환 기록 (월 상환 금액: 27,778원)
INSERT IGNORE INTO loan_repayment_record (loan_repayment_record_id, create_at, member_loan_id, repayment_balance, repayment_date, update_at, day, month, year) VALUES
(1, '2024-02-01 12:00:00', 1, 27778, '2024-02-01 12:00:00', '2024-02-01 12:00:00', 1, 2, 2024),
(2, '2024-03-01 12:00:00', 1, 27778, '2024-03-01 12:00:00', '2024-03-01 12:00:00', 1, 3, 2024),
(3, '2024-04-01 12:00:00', 1, 27778, '2024-04-01 12:00:00', '2024-04-01 12:00:00', 1, 4, 2024),
(4, '2024-05-01 12:00:00', 1, 27778, '2024-05-01 12:00:00', '2024-05-01 12:00:00', 1, 5, 2024),
(5, '2024-06-01 12:00:00', 1, 27778, '2024-06-01 12:00:00', '2024-06-01 12:00:00', 1, 6, 2024),
(6, '2024-07-01 12:00:00', 1, 27778, '2024-07-01 12:00:00', '2024-07-01 12:00:00', 1, 7, 2024),
(7, '2024-08-01 12:00:00', 1, 27778, '2024-08-01 12:00:00', '2024-08-01 12:00:00', 1, 8, 2024),
(8, '2024-09-01 12:00:00', 1, 27778, '2024-09-01 12:00:00', '2024-09-01 12:00:00', 1, 9, 2024);

-- Loan Product 2 상환 기록 (월 상환 금액: 55,556원, 3월부터 시작)
INSERT IGNORE INTO loan_repayment_record (loan_repayment_record_id, create_at, member_loan_id, repayment_balance, repayment_date, update_at, day, month, year) VALUES
(6, '2024-03-01 12:00:00', 2, 55556, '2024-03-01 12:00:00', '2024-03-01 12:00:00', 1, 3, 2024),
(7, '2024-04-01 12:00:00', 2, 55556, '2024-04-01 12:00:00', '2024-04-01 12:00:00', 1, 4, 2024),
(8, '2024-05-01 12:00:00', 2, 55556, '2024-05-01 12:00:00', '2024-05-01 12:00:00', 1, 5, 2024),
(9, '2024-06-01 12:00:00', 2, 55556, '2024-06-01 12:00:00', '2024-06-01 12:00:00', 1, 6, 2024),
(10, '2024-07-01 12:00:00', 2, 55556, '2024-07-01 12:00:00', '2024-07-01 12:00:00', 1, 7, 2024),
(11, '2024-08-01 12:00:00', 2, 55556, '2024-08-01 12:00:00', '2024-08-01 12:00:00', 1, 8, 2024),
(12, '2024-09-01 12:00:00', 2, 55556, '2024-09-01 12:00:00', '2024-09-01 12:00:00', 1, 9, 2024);

-- Loan Product 3 상환 기록 (월 상환 금액: 83,333원, 4월부터 시작)
INSERT IGNORE INTO loan_repayment_record (loan_repayment_record_id, create_at, member_loan_id, repayment_balance, repayment_date, update_at, day, month, year) VALUES
(11, '2024-04-01 12:00:00', 3, 83333, '2024-04-01 12:00:00', '2024-04-01 12:00:00', 1, 4, 2024),
(12, '2024-05-01 12:00:00', 3, 83333, '2024-05-01 12:00:00', '2024-05-01 12:00:00', 1, 5, 2024),
(13, '2024-06-01 12:00:00', 3, 83333, '2024-06-01 12:00:00', '2024-06-01 12:00:00', 1, 6, 2024),
(14, '2024-07-01 12:00:00', 3, 83333, '2024-07-01 12:00:00', '2024-07-01 12:00:00', 1, 7, 2024),
(15, '2024-08-01 12:00:00', 3, 83333, '2024-08-01 12:00:00', '2024-08-01 12:00:00', 1, 8, 2024),
(16, '2024-09-01 12:00:00', 3, 83333, '2024-09-01 12:00:00', '2024-09-01 12:00:00', 1, 9, 2024);

-- Loan Product 4 상환 기록 (월 상환 금액: 111,111원, 5월부터 시작)
INSERT IGNORE INTO loan_repayment_record (loan_repayment_record_id, create_at, member_loan_id, repayment_balance, repayment_date, update_at, day, month, year) VALUES
(16, '2024-05-01 12:00:00', 4, 111111, '2024-05-01 12:00:00', '2024-05-01 12:00:00', 1, 5, 2024),
(17, '2024-06-01 12:00:00', 4, 111111, '2024-06-01 12:00:00', '2024-06-01 12:00:00', 1, 6, 2024),
(18, '2024-07-01 12:00:00', 4, 111111, '2024-07-01 12:00:00', '2024-07-01 12:00:00', 1, 7, 2024),
(19, '2024-08-01 12:00:00', 4, 111111, '2024-08-01 12:00:00', '2024-08-01 12:00:00', 1, 8, 2024),
(20, '2024-09-01 12:00:00', 4, 111111, '2024-09-01 12:00:00', '2024-09-01 12:00:00', 1, 9, 2024);

-- Loan Product 5 상환 기록 (월 상환 금액: 138,889원, 6월부터 시작)
INSERT IGNORE INTO loan_repayment_record (loan_repayment_record_id, create_at, member_loan_id, repayment_balance, repayment_date, update_at, day, month, year) VALUES
(21, '2024-06-01 12:00:00', 5, 138889, '2024-06-01 12:00:00', '2024-06-01 12:00:00', 1, 6, 2024),
(22, '2024-07-01 12:00:00', 5, 138889, '2024-07-01 12:00:00', '2024-07-01 12:00:00', 1, 7, 2024),
(23, '2024-08-01 12:00:00', 5, 138889, '2024-08-01 12:00:00', '2024-08-01 12:00:00', 1, 8, 2024),
(24, '2024-09-01 12:00:00', 5, 138889, '2024-09-01 12:00:00', '2024-09-01 12:00:00', 1, 9, 2024);

-- 신한은행 전세자금대출 상환 기록 (월 상환 금액: 3,468,000원 ±15%, 8월부터 시작 )
INSERT IGNORE INTO loan_repayment_record (loan_repayment_record_id, create_at, member_loan_id, repayment_balance, repayment_date, update_at, day, month, year) VALUES
(25, '2019-09-01 12:00:00', 6, 3468000, '2019-09-01 12:00:00', '2019-09-01 12:00:00', 1, 9, 2019),
(26, '2019-10-01 12:00:00', 6, 3581200, '2019-10-01 12:00:00', '2019-10-01 12:00:00', 1, 10, 2019),
(27, '2019-11-01 12:00:00', 6, 3304500, '2019-11-01 12:00:00', '2019-11-01 12:00:00', 1, 11, 2019),
(28, '2019-12-01 12:00:00', 6, 3651400, '2019-12-01 12:00:00', '2019-12-01 12:00:00', 1, 12, 2019),
(29, '2020-01-01 12:00:00', 6, 3468000, '2020-01-01 12:00:00', '2020-01-01 12:00:00', 1, 1, 2020),
(30, '2020-02-01 12:00:00', 6, 3147000, '2020-02-01 12:00:00', '2020-02-01 12:00:00', 1, 2, 2020),
(31, '2020-03-01 12:00:00', 6, 3426700, '2020-03-01 12:00:00', '2020-03-01 12:00:00', 1, 3, 2020),
(32, '2020-04-01 12:00:00', 6, 3573400, '2020-04-01 12:00:00', '2020-04-01 12:00:00', 1, 4, 2020),
(33, '2020-05-01 12:00:00', 6, 3334600, '2020-05-01 12:00:00', '2020-05-01 12:00:00', 1, 5, 2020),
(34, '2020-06-01 12:00:00', 6, 3468000, '2020-06-01 12:00:00', '2020-06-01 12:00:00', 1, 6, 2020),
(35, '2020-07-01 12:00:00', 6, 3505200, '2020-07-01 12:00:00', '2020-07-01 12:00:00', 1, 7, 2020),
(36, '2020-08-01 12:00:00', 6, 3190500, '2020-08-01 12:00:00', '2020-08-01 12:00:00', 1, 8, 2020),
(37, '2020-09-01 12:00:00', 6, 3406000, '2020-09-01 12:00:00', '2020-09-01 12:00:00', 1, 9, 2020),
(38, '2020-10-01 12:00:00', 6, 3468000, '2020-10-01 12:00:00', '2020-10-01 12:00:00', 1, 10, 2020),
(39, '2020-11-01 12:00:00', 6, 3589200, '2020-11-01 12:00:00', '2020-11-01 12:00:00', 1, 11, 2020),
(40, '2020-12-01 12:00:00', 6, 3468000, '2020-12-01 12:00:00', '2020-12-01 12:00:00', 1, 12, 2020),
(41, '2021-01-01 12:00:00', 6, 3352000, '2021-01-01 12:00:00', '2021-01-01 12:00:00', 1, 1, 2021),
(42, '2021-02-01 12:00:00', 6, 3498600, '2021-02-01 12:00:00', '2021-02-01 12:00:00', 1, 2, 2021),
(43, '2021-03-01 12:00:00', 6, 3490000, '2021-03-01 12:00:00', '2021-03-01 12:00:00', 1, 3, 2021),
(44, '2021-04-01 12:00:00', 6, 3468000, '2021-04-01 12:00:00', '2021-04-01 12:00:00', 1, 4, 2021),
(45, '2021-05-01 12:00:00', 6, 3278000, '2021-05-01 12:00:00', '2021-05-01 12:00:00', 1, 5, 2021),
(46, '2021-06-01 12:00:00', 6, 3431000, '2021-06-01 12:00:00', '2021-06-01 12:00:00', 1, 6, 2021),
(47, '2021-07-01 12:00:00', 6, 3537000, '2021-07-01 12:00:00', '2021-07-01 12:00:00', 1, 7, 2021),
(48, '2021-08-01 12:00:00', 6, 3468000, '2021-08-01 12:00:00', '2021-08-01 12:00:00', 1, 8, 2021),
(49, '2021-09-01 12:00:00', 6, 3397500, '2021-09-01 12:00:00', '2021-09-01 12:00:00', 1, 9, 2021),
(50, '2021-10-01 12:00:00', 6, 3468000, '2021-10-01 12:00:00', '2021-10-01 12:00:00', 1, 10, 2021),
(51, '2021-11-01 12:00:00', 6, 3576400, '2021-11-01 12:00:00', '2021-11-01 12:00:00', 1, 11, 2021),
(52, '2021-12-01 12:00:00', 6, 3468000, '2021-12-01 12:00:00', '2021-12-01 12:00:00', 1, 12, 2021),
(53, '2022-01-01 12:00:00', 6, 3348000, '2022-01-01 12:00:00', '2022-01-01 12:00:00', 1, 1, 2022),
(54, '2022-02-01 12:00:00', 6, 3620000, '2022-02-01 12:00:00', '2022-02-01 12:00:00', 1, 2, 2022),
(55, '2022-03-01 12:00:00', 6, 3486000, '2022-03-01 12:00:00', '2022-03-01 12:00:00', 1, 3, 2022),
(56, '2022-04-01 12:00:00', 6, 3364000, '2022-04-01 12:00:00', '2022-04-01 12:00:00', 1, 4, 2022),
(57, '2022-05-01 12:00:00', 6, 3479200, '2022-05-01 12:00:00', '2022-05-01 12:00:00', 1, 5, 2022),
(58, '2022-06-01 12:00:00', 6, 3524700, '2022-06-01 12:00:00', '2022-06-01 12:00:00', 1, 6, 2022),
(59, '2022-07-01 12:00:00', 6, 3445800, '2022-07-01 12:00:00', '2022-07-01 12:00:00', 1, 7, 2022),
(60, '2022-08-01 12:00:00', 6, 3468000, '2022-08-01 12:00:00', '2022-08-01 12:00:00', 1, 8, 2022),
(61, '2022-09-01 12:00:00', 6, 3400000, '2022-09-01 12:00:00', '2022-09-01 12:00:00', 1, 9, 2022),
(62, '2022-10-01 12:00:00', 6, 3546000, '2022-10-01 12:00:00', '2022-10-01 12:00:00', 1, 10, 2022),
(63, '2022-11-01 12:00:00', 6, 3478900, '2022-11-01 12:00:00', '2022-11-01 12:00:00', 1, 11, 2022),
(64, '2022-12-01 12:00:00', 6, 3361000, '2022-12-01 12:00:00', '2022-12-01 12:00:00', 1, 12, 2022),
(65, '2023-01-01 12:00:00', 6, 3627000, '2023-01-01 12:00:00', '2023-01-01 12:00:00', 1, 1, 2023),
(66, '2023-02-01 12:00:00', 6, 3456000, '2023-02-01 12:00:00', '2023-02-01 12:00:00', 1, 2, 2023),
(67, '2023-03-01 12:00:00', 6, 3557000, '2023-03-01 12:00:00', '2023-03-01 12:00:00', 1, 3, 2023),
(68, '2023-04-01 12:00:00', 6, 3382000, '2023-04-01 12:00:00', '2023-04-01 12:00:00', 1, 4, 2023),
(69, '2023-05-01 12:00:00', 6, 3465000, '2023-05-01 12:00:00', '2023-05-01 12:00:00', 1, 5, 2023),
(70, '2023-06-01 12:00:00', 6, 3520000, '2023-06-01 12:00:00', '2023-06-01 12:00:00', 1, 6, 2023),
(71, '2023-07-01 12:00:00', 6, 3406000, '2023-07-01 12:00:00', '2023-07-01 12:00:00', 1, 7, 2023),
(72, '2023-08-01 12:00:00', 6, 3479000, '2023-08-01 12:00:00', '2023-08-01 12:00:00', 1, 8, 2023),
(73, '2023-09-01 12:00:00', 6, 3530000, '2023-09-01 12:00:00', '2023-09-01 12:00:00', 1, 9, 2023),
(74, '2023-10-01 12:00:00', 6, 3468000, '2023-10-01 12:00:00', '2023-10-01 12:00:00', 1, 10, 2023),
(75, '2023-11-01 12:00:00', 6, 3589200, '2023-11-01 12:00:00', '2023-11-01 12:00:00', 1, 11, 2023),
(76, '2023-12-01 12:00:00', 6, 3468000, '2023-12-01 12:00:00', '2023-12-01 12:00:00', 1, 12, 2023),
(77, '2024-01-01 12:00:00', 6, 3352000, '2024-01-01 12:00:00', '2024-01-01 12:00:00', 1, 1, 2024),
(78, '2024-02-01 12:00:00', 6, 3498600, '2024-02-01 12:00:00', '2024-02-01 12:00:00', 1, 2, 2024),
(79, '2024-03-01 12:00:00', 6, 3490000, '2024-03-01 12:00:00', '2024-03-01 12:00:00', 1, 3, 2024),
(80, '2024-04-01 12:00:00', 6, 3468000, '2024-04-01 12:00:00', '2024-04-01 12:00:00', 1, 4, 2024),
(81, '2024-05-01 12:00:00', 6, 3278000, '2024-05-01 12:00:00', '2024-05-01 12:00:00', 1, 5, 2024),
(82, '2024-06-01 12:00:00', 6, 3431000, '2024-06-01 12:00:00', '2024-06-01 12:00:00', 1, 6, 2024),
(83, '2024-07-01 12:00:00', 6, 3537000, '2024-07-01 12:00:00', '2024-07-01 12:00:00', 1, 7, 2024),
(84, '2024-08-01 12:00:00', 6, 3468000, '2024-08-01 12:00:00', '2024-08-01 12:00:00', 1, 8, 2024),
(85, '2024-09-01 12:00:00', 6, 3397500, '2024-09-01 12:00:00', '2024-09-01 12:00:00', 1, 9, 2024);



-- 7. Account 테이블에 데이터 삽입 (이미 존재할 경우 삽입 무시)
INSERT IGNORE INTO account (account_id, account_num, member_id, account_balance, account_name) VALUES
(1, '110-1234-5678', (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1000000, '신한 MY 통장'),
(2, '110-2345-6789', (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 2000000, '신한 S 드림 적금'),
(3, '110-3456-7890', (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 3000000, '신한 S행복 적금'),
(4, '110-4567-8901', (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 4000000, '신한 주니어 저축예금'),
(5, '110-5678-9012', (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 5000000, '신한 S-20 정기예금');

-- 8. ExpenseCategory 테이블에 카테고리 데이터 삽입 (이미 존재할 경우 삽입 무시)
INSERT IGNORE INTO expense_category (expense_category_id, name) VALUES
(1, '식비'),
(2, '대출'),
(3, '문화'),
(4, '유흥'),
(5, '교통'),
(6, '건강');

-- 9. Expense 테이블에 더미 데이터 삽입 (이미 존재할 경우 삽입 무시)
INSERT IGNORE INTO expense (expense_id, member_id, expense_category_id, title, price, expense_date) VALUES
(1, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1, '마트 장보기', 50000, '2024-08-01 10:00:00'),
(2, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 2, '대출 상환금', 200000, '2024-08-02 12:00:00'),
(3, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 3, '영화 관람', 15000, '2024-08-03 15:00:00'),
(4, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 4, '술자리', 80000, '2024-08-04 20:00:00'),
(5, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 5, '택시 이용', 25000, '2024-08-05 08:00:00'),
(6, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 6, '병원 진료비', 70000, '2024-08-06 09:00:00');

-- 6월 더미 데이터 삽입
INSERT IGNORE INTO expense (expense_id, member_id, expense_category_id, title, price, expense_date) VALUES
(7, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1, '마트 장보기', 65000, '2024-06-01 10:00:00'),
(8, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 3, '커피 구매', 4500, '2024-06-02 11:00:00'),
(9, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 4, '친구들과 저녁', 80000, '2024-06-02 20:00:00'),
(10, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 5, '지하철 이용', 1250, '2024-06-03 08:00:00'),
(11, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 2, '대출 상환금', 200000, '2024-06-05 12:00:00'),
(12, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 6, '영화 관람', 15000, '2024-06-06 19:00:00'),
(13, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1, '점심식사', 12000, '2024-06-07 12:00:00'),
(14, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 3, '책 구매', 15000, '2024-06-08 14:00:00'),
(15, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 4, '술자리', 90000, '2024-06-09 21:00:00'),
(16, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 5, '택시 이용', 18000, '2024-06-10 23:00:00'),
(17, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1, '저녁식사', 25000, '2024-06-11 19:00:00'),
(18, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 6, '필라테스 수업', 60000, '2024-06-12 18:00:00'),
(19, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 2, '대출 상환금', 200000, '2024-06-15 12:00:00'),
(20, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 3, '영화 관람', 13000, '2024-06-15 16:00:00'),
(21, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 4, '카페에서 친구 만나기', 18000, '2024-06-16 15:00:00'),
(22, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 5, '버스 이용', 1200, '2024-06-17 08:30:00'),
(23, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1, '아침식사', 5000, '2024-06-18 08:00:00'),
(24, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 6, '병원 진료비', 50000, '2024-06-19 09:00:00'),
(25, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 2, '대출 상환금', 200000, '2024-06-20 12:00:00'),
(26, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1, '외식', 30000, '2024-06-21 19:00:00'),
(27, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 3, '뮤지컬 관람', 80000, '2024-06-22 20:00:00'),
(28, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 4, '친구들과 저녁', 70000, '2024-06-23 20:00:00'),
(29, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 5, '택시 이용', 24000, '2024-06-24 23:00:00'),
(30, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 6, '영양제 구매', 40000, '2024-06-25 10:00:00'),
(31, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1, '점심식사', 12000, '2024-06-26 12:00:00'),
(32, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 3, '책 구매', 16000, '2024-06-27 14:00:00'),
(33, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 4, '술자리', 75000, '2024-06-28 21:00:00'),
(34, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 5, '지하철 이용', 1250, '2024-06-29 09:00:00'),
(35, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 6, '피부과 진료비', 70000, '2024-06-30 15:00:00');

-- 7월 더미 데이터 삽입
INSERT IGNORE INTO expense (expense_id, member_id, expense_category_id, title, price, expense_date) VALUES
(36, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1, '마트 장보기', 68000, '2024-07-01 11:00:00'),
(37, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 3, '커피 구매', 5000, '2024-07-01 15:00:00'),
(38, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 4, '친구들과 저녁', 82000, '2024-07-02 20:00:00'),
(39, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 5, '택시 이용', 21000, '2024-07-03 08:00:00'),
(40, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 2, '대출 상환금', 200000, '2024-07-04 12:00:00'),
(41, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 6, '필라테스 수업', 60000, '2024-07-05 18:00:00'),
(42, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1, '점심식사', 15000, '2024-07-06 13:00:00'),
(43, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 3, '영화 관람', 14000, '2024-07-07 17:00:00'),
(44, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 4, '카페에서 친구 만나기', 20000, '2024-07-08 14:00:00'),
(45, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 5, '버스 이용', 1200, '2024-07-09 08:30:00'),
(46, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1, '아침식사', 4500, '2024-07-10 08:00:00'),
(47, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 6, '병원 진료비', 50000, '2024-07-11 09:00:00'),
(48, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 2, '대출 상환금', 200000, '2024-07-12 12:00:00'),
(49, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1, '외식', 32000, '2024-07-13 19:00:00'),
(50, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 3, '뮤지컬 관람', 90000, '2024-07-14 20:00:00'),
(51, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 4, '친구들과 저녁', 74000, '2024-07-15 20:00:00'),
(52, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 5, '택시 이용', 25000, '2024-07-16 23:00:00'),
(53, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 6, '영양제 구매', 45000, '2024-07-17 10:00:00'),
(54, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1, '점심식사', 17000, '2024-07-18 12:00:00'),
(55, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 3, '책 구매', 18000, '2024-07-19 14:00:00'),
(56, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 4, '술자리', 76000, '2024-07-20 21:00:00'),
(57, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 5, '지하철 이용', 1250, '2024-07-21 09:00:00'),
(58, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 6, '피부과 진료비', 75000, '2024-07-22 15:00:00'),
(59, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1, '저녁식사', 26000, '2024-07-23 19:00:00'),
(60, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 3, '영화 관람', 12000, '2024-07-24 18:00:00'),
(61, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 4, '친구들과 저녁', 80000, '2024-07-25 20:00:00'),
(62, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 5, '택시 이용', 23000, '2024-07-26 08:00:00'),
(63, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 6, '필라테스 수업', 60000, '2024-07-27 18:00:00'),
(64, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1, '아침식사', 5000, '2024-07-28 08:00:00'),
(65, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 2, '대출 상환금', 200000, '2024-07-29 12:00:00');

-- 8월 더미 데이터 삽입
INSERT IGNORE INTO expense (expense_id, member_id, expense_category_id, title, price, expense_date) VALUES
(66, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1, '마트 장보기', 70000, '2024-08-01 11:00:00'),
(67, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 3, '커피 구매', 5000, '2024-08-01 15:00:00'),
(68, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 4, '친구들과 저녁', 85000, '2024-08-02 20:00:00'),
(69, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 5, '택시 이용', 22000, '2024-08-03 08:00:00'),
(70, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 2, '대출 상환금', 200000, '2024-08-04 12:00:00'),
(71, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 6, '필라테스 수업', 60000, '2024-08-05 18:00:00'),
(72, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1, '점심식사', 16000, '2024-08-06 12:00:00'),
(73, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 3, '영화 관람', 13000, '2024-08-07 17:00:00'),
(74, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 4, '카페에서 친구 만나기', 18000, '2024-08-08 14:00:00'),
(75, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 5, '버스 이용', 1200, '2024-08-09 08:30:00'),
(76, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1, '아침식사', 4500, '2024-08-10 08:00:00'),
(77, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 6, '병원 진료비', 50000, '2024-08-11 09:00:00'),
(78, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 2, '대출 상환금', 200000, '2024-08-12 12:00:00'),
(79, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1, '외식', 30000, '2024-08-13 19:00:00'),
(80, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 3, '뮤지컬 관람', 85000, '2024-08-14 20:00:00'),
(81, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 4, '친구들과 저녁', 75000, '2024-08-15 20:00:00'),
(82, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 5, '택시 이용', 23000, '2024-08-16 23:00:00'),
(83, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 6, '영양제 구매', 45000, '2024-08-17 10:00:00'),
(84, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1, '점심식사', 17000, '2024-08-18 12:00:00'),
(85, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 3, '책 구매', 18000, '2024-08-19 14:00:00'),
(86, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 4, '술자리', 76000, '2024-08-20 21:00:00'),
(87, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 5, '지하철 이용', 1250, '2024-08-21 09:00:00'),
(88, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 6, '피부과 진료비', 75000, '2024-08-22 15:00:00'),
(89, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1, '저녁식사', 26000, '2024-08-23 19:00:00'),
(90, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 3, '영화 관람', 12000, '2024-08-24 18:00:00'),
(91, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 4, '친구들과 저녁', 80000, '2024-08-25 20:00:00'),
(92, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 5, '택시 이용', 23000, '2024-08-26 08:00:00'),
(93, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 6, '필라테스 수업', 60000, '2024-08-27 18:00:00'),
(94, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1, '아침식사', 5000, '2024-08-28 08:00:00'),
(95, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 2, '대출 상환금', 200000, '2024-08-29 12:00:00'),
(96, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 3, '공연 관람', 95000, '2024-08-30 20:00:00');

-- 10. Quiz 테이블에 더미 데이터 삽입 (이미 존재할 경우 삽입 무시)
INSERT IGNORE INTO quiz (quiz_id, created_date, modified_date, answer, ended_at, example, is_correct, status, member_id)
VALUES
(1, NOW(), NOW(), 200000, DATE_ADD(NOW(), INTERVAL 1 HOUR), 150000, 0, 'NOT_STARTED', 1);

-- 11. test@gmail.com 회원에게 1번 무를 추가
INSERT IGNORE INTO member_radish (member_radish_id, member_id, radish_id, radish_number, created_date, modified_date)
VALUES
(1, (SELECT member_id FROM member WHERE email = 'test@gmail.com'),
1, -- 1번 무를 의미
1, -- 기본 무의 개수
NOW(),
NOW());

-- 12. radish_time 테이블에 새로운 레코드 추가
INSERT INTO radish_time (member_id, created_date, modified_date)
VALUES
    ((SELECT member_id FROM member WHERE email = 'test@gmail.com'),
     NOW(),
     NOW());

-- 12. radish_time 테이블에 3월 레코드 추가
INSERT INTO radish_time (member_id, created_date, modified_date)
VALUES
    ((SELECT member_id FROM member WHERE email = 'test@gmail.com'),
     '2024-03-01 00:00:00',
     '2024-03-01 00:00:00');

-- 12. radish_time 테이블에 4월 레코드 추가
INSERT INTO radish_time (member_id, created_date, modified_date)
VALUES
    ((SELECT member_id FROM member WHERE email = 'test@gmail.com'),
     '2024-04-01 00:00:00',
     '2024-04-01 00:00:00');

-- 12. radish_time 테이블에 5월 레코드 추가
INSERT INTO radish_time (member_id, created_date, modified_date)
VALUES
    ((SELECT member_id FROM member WHERE email = 'test@gmail.com'),
     '2024-05-01 00:00:00',
     '2024-05-01 00:00:00');

-- 12. radish_time 테이블에 6월 레코드 추가
INSERT INTO radish_time (member_id, created_date, modified_date)
VALUES
    ((SELECT member_id FROM member WHERE email = 'test@gmail.com'),
     '2024-06-01 00:00:00',
     '2024-06-01 00:00:00');

-- 12. radish_time 테이블에 7월 레코드 추가
INSERT INTO radish_time (member_id, created_date, modified_date)
VALUES
    ((SELECT member_id FROM member WHERE email = 'test@gmail.com'),
     '2024-07-01 00:00:00',
     '2024-07-01 00:00:00');

-- 12. radish_time 테이블에 8월 레코드 추가
INSERT INTO radish_time (member_id, created_date, modified_date)
VALUES
    ((SELECT member_id FROM member WHERE email = 'test@gmail.com'),
     '2024-08-01 00:00:00',
     '2024-08-01 00:00:00');

-- 11. test@gmail.com 회원에게 1번 무를 추가
INSERT IGNORE INTO member_radish (member_radish_id, member_id, radish_id, radish_number, created_date, modified_date)
VALUES
(2, (SELECT member_id FROM member WHERE email = 'test@gmail.com'),
4, -- 1번 무를 의미
1, -- 기본 무의 개수
'2024-04-01 00:00:00', -- 5월에 추가
'2024-04-01 00:00:00');

-- 11. test@gmail.com 회원에게 1번 무를 추가
INSERT IGNORE INTO member_radish (member_radish_id, member_id, radish_id, radish_number, created_date, modified_date)
VALUES
(3, (SELECT member_id FROM member WHERE email = 'test@gmail.com'),
5, -- 1번 무를 의미
1, -- 기본 무의 개수
'2024-05-01 00:00:00', -- 5월에 추가
'2024-05-01 00:00:00');

       -- 11. test@gmail.com 회원에게 1번 무를 추가
INSERT IGNORE INTO member_radish (member_radish_id, member_id, radish_id, radish_number, created_date, modified_date)
VALUES
(4, (SELECT member_id FROM member WHERE email = 'test@gmail.com'),
6, -- 1번 무를 의미
1, -- 기본 무의 개수
'2024-06-01 00:00:00', -- 6월에 추가
'2024-06-01 00:00:00');

       -- 11. test@gmail.com 회원에게 1번 무를 추가
INSERT IGNORE INTO member_radish (member_radish_id, member_id, radish_id, radish_number, created_date, modified_date)
VALUES
(4, (SELECT member_id FROM member WHERE email = 'test@gmail.com'),
7, -- 1번 무를 의미
1, -- 기본 무의 개수
'2024-07-01 00:00:00', -- 7월에 추가
'2024-07-01 00:00:00');

       -- 11. test@gmail.com 회원에게 1번 무를 추가
INSERT IGNORE INTO member_radish (member_radish_id, member_id, radish_id, radish_number, created_date, modified_date)
VALUES
(5, (SELECT member_id FROM member WHERE email = 'test@gmail.com'),
8, -- 1번 무를 의미
1, -- 기본 무의 개수
'2024-08-01 00:00:00', -- 8월에 추가
'2024-08-01 00:00:00');

-- 11. test@gmail.com 회원에게 1번 무를 추가
INSERT IGNORE INTO member_radish (member_radish_id, member_id, radish_id, radish_number, created_date, modified_date)
VALUES
(6, (SELECT member_id FROM member WHERE email = 'test@gmail.com'),
10, -- 1번 무를 의미
1, -- 기본 무의 개수
'2024-03-01 00:00:00', -- 5월에 추가
'2024-03-01 00:00:00');