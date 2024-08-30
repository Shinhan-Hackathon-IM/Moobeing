-- 1. 맴버 생성
INSERT IGNORE INTO member (member_id, email, password, total_points, total_loan, name, gender, birthday, user_key, selected_radish_id, month_aver, month_complete)
VALUES (1, 'test@gmail.com', 'test', 0, 0, 'Test User', 'M', '000101', 'user_key_123', 1, 10000000, false);

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
(12, '카카오뱅크 청년대출', 'https://github.com/user-attachments/assets/ef5ec69e-abe0-4fae-85e9-8b3bf541e607', '카카오뱅크', 120, 2.3, '카카오뱅크의 청년을 위한 장기 대출 상품입니다.');

-- 3. test@gmail.com으로 대출 상품 5개 가입시키기
INSERT IGNORE INTO member_loan (member_loan_id, member_id, loan_product_name, status, initial_balance, remaining_balance, repayment_deadline, withdrawal_account_no, start_year, start_month, start_day) VALUES
(1, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), '우리은행 주택담보대출', 'Active', 1000000, 861110, '2025-01-01', '123-456-789', 2024, 1, 1),
(2, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), '신한은행 직장인대출', 'Active', 2000000, 1722220, '2025-02-01', '123-456-789', 2024, 2, 1),
(3, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 'IBK기업은행 중소기업대출', 'Active', 3000000, 2583335, '2025-03-01', '123-456-789', 2024, 3, 1),
(4, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 'KB국민은행 전세자금대출', 'Active', 4000000, 3444445, '2025-04-01', '123-456-789', 2024, 4, 1),
(5, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), '하나은행 생활안정대출', 'Active', 5000000, 4305555, '2025-05-01', '123-456-789', 2024, 5, 1);

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
(60, '하나은행 생활안정대출', '00', 12, 1700000);



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


-- 7. Account 테이블에 데이터 삽입 (이미 존재할 경우 삽입 무시)
INSERT IGNORE INTO account (account_id, account_num, member_id, account_balance, account_name) VALUES
(1, '123-456-789', (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1000000, '계좌 이름'),
(2, '123-456-790', (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 2000000, '계좌 이름'),
(3, '123-456-791', (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 3000000, '계좌 이름'),
(4, '123-456-792', (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 4000000, '계좌 이름'),
(5, '123-456-793', (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 5000000, '계좌 이름');

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

-- 10. account 더미 데이터 생성하기.
INSERT IGNORE INTO account (account_id, account_num, member_id, account_balance, account_name) VALUES
(1, '110-1234-5678', (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1000000, '신한 MY 통장'),
(2, '110-2345-6789', (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 2000000, '신한 S 드림 적금'),
(3, '110-3456-7890', (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 3000000, '신한 S행복 적금'),
(4, '110-4567-8901', (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 4000000, '신한 주니어 저축예금'),
(5, '110-5678-9012', (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 5000000, '신한 S-20 정기예금');

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