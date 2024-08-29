-- 1. 맴버 생성
INSERT IGNORE INTO member (member_id, email, password, total_points, total_loan, name, gender, birthday, user_key, selected_radish_id)
VALUES (1, 'test@gmail.com', 'test', 0, 0, 'Test User', 'M', '000101', 'user_key_123', 1);

-- 2. 대출 상품 더미 데이터 12개 생성
INSERT IGNORE INTO loan_product (loan_product_id, loan_name, bank_image_url, bank_name, loan_period, interest_rate, description, account_Type_Unique_No) VALUES
(1, '우리은행 주택담보대출', 'https://github.com/user-attachments/assets/0fe19810-9646-4beb-bfc3-e3e15b69f6c1', '우리은행', 240, 2.5, '우리은행의 주택담보대출 상품입니다.', '020-4-f37c1da89b1a42'),
(2, '신한은행 직장인대출', 'https://github.com/user-attachments/assets/fa2aedb1-6886-4982-84f3-6e773fed7792', '신한은행', 60, 3.2, '신한은행의 직장인을 위한 대출 상품입니다.', '088-4-9eb46cbba08c4f'),
(3, 'IBK기업은행 중소기업대출', 'https://github.com/user-attachments/assets/a723840f-838b-4160-9e96-18daf28fe7ba', 'IBK기업은행', 120, 3.8, 'IBK기업은행의 중소기업을 위한 대출 상품입니다.', '003-4-562719cbf95f4e'),
(4, 'KB국민은행 전세자금대출', 'https://github.com/user-attachments/assets/16e42300-e535-46c6-b184-2e8f1f891dc0', 'KB국민은행', 36, 2.7, 'KB국민은행의 전세자금대출 상품입니다.', '004-4-903c918814034d'),
(5, '하나은행 생활안정대출', 'https://github.com/user-attachments/assets/c1f2b5aa-0bb9-46c6-ab08-cafcd29dba73', '하나은행', 48, 4.0, '하나은행의 생활안정을 위한 대출 상품입니다.', '081-4-551fa9b08bd245'),
(6, '카카오뱅크 비상금대출', 'https://github.com/user-attachments/assets/ef5ec69e-abe0-4fae-85e9-8b3bf541e607', '카카오뱅크', 12, 3.0, '카카오뱅크의 비상시에 사용할 수 있는 소액 대출 상품입니다.', '090-4-171759d655f24e'),
(7, '우리은행 자영업자대출', 'https://github.com/user-attachments/assets/0fe19810-9646-4beb-bfc3-e3e15b69f6c1', '우리은행', 72, 4.2, '우리은행의 자영업자를 위한 대출 상품입니다.', '020-4-cfcb57125c744e'),
(8, '신한은행 신용대출', 'https://github.com/user-attachments/assets/fa2aedb1-6886-4982-84f3-6e773fed7792', '신한은행', 36, 3.5, '신한은행의 신용대출 상품입니다.', '088-4-84a366ee2b8f45'),
(9, 'IBK기업은행 창업대출', 'https://github.com/user-attachments/assets/a723840f-838b-4160-9e96-18daf28fe7ba', 'IBK기업은행', 84, 4.1, 'IBK기업은행의 창업 지원을 위한 대출 상품입니다.', '003-4-4c9e9eba846742'),
(10, 'KB국민은행 자동차구입대출', 'https://github.com/user-attachments/assets/16e42300-e535-46c6-b184-2e8f1f891dc0', 'KB국민은행', 60, 3.9, 'KB국민은행의 자동차 구입을 위한 대출 상품입니다.', '004-4-ace8e885f7444f'),
(11, '하나은행 교육비대출', 'https://github.com/user-attachments/assets/c1f2b5aa-0bb9-46c6-ab08-cafcd29dba73', '하나은행', 48, 2.9, '하나은행의 교육비 지원을 위한 대출 상품입니다.', '081-4-fc8922f620b34a'),
(12, '카카오뱅크 청년대출', 'https://github.com/user-attachments/assets/ef5ec69e-abe0-4fae-85e9-8b3bf541e607', '카카오뱅크', 120, 2.3, '카카오뱅크의 청년을 위한 장기 대출 상품입니다.', '090-4-76fcef0271db4b'),
(13, '한국은행 대출 상품', 'https://yt3.googleusercontent.com/ytc/AIdro_lc28DA1UOb1EMSbKIs5Xuv5-3x06aKoXBzTosRNvZUyYg=s900-c-k-c0x00ffffff-no-rj', '한국은행', 7, 10.0, '한국은행 신용 대출 상품입니다.', '001-4-2f8aa483083b40');

-- 3. test@gmail.com으로 대출 상품 5개 가입시키기
INSERT IGNORE INTO member_loan (member_loan_id, member_id, loan_product_name, status, initial_balance, remaining_balance, repayment_deadline, withdrawal_account_no, start_year, start_month, start_day) VALUES
(1, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), '우리은행 주택담보대출', 'Active', 1000000, 861110, '2025-01-01', '123-456-789', 2024, 1, 1),
(2, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), '신한은행 직장인대출', 'Active', 2000000, 1722220, '2025-02-01', '123-456-789', 2024, 2, 1),
(3, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 'IBK기업은행 중소기업대출', 'Active', 3000000, 2583335, '2025-03-01', '123-456-789', 2024, 3, 1),
(4, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 'KB국민은행 전세자금대출', 'Active', 4000000, 3444445, '2025-04-01', '123-456-789', 2024, 4, 1),
(5, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), '하나은행 생활안정대출', 'Active', 5000000, 4305555, '2025-05-01', '123-456-789', 2024, 5, 1);

-- 4. 대출 상품의 또래들 2000년생에 대한 더미데이터 생성
INSERT IGNORE INTO average_loan_repayment_record (average_loan_repayment_record_id, loan_name, age, month, repayment_balance) VALUES
(1, '우리은행 주택담보대출', 24, 1, 1000000),  -- 2000년생, 2024년 기준 24세, 1월 잔액
(2, '우리은행 주택담보대출', 24, 2, 900000),   -- 2000년생, 2024년 기준 24세, 2월 잔액
(3, '우리은행 주택담보대출', 24, 3, 800000),   -- 2000년생, 2024년 기준 24세, 3월 잔액
(4, '우리은행 주택담보대출', 24, 4, 700000),   -- 2000년생, 2024년 기준 24세, 4월 잔액
(5, '우리은행 주택담보대출', 24, 5, 600000),   -- 2000년생, 2024년 기준 24세, 5월 잔액
(6, '우리은행 주택담보대출', 24, 6, 500000),   -- 2000년생, 2024년 기준 24세, 6월 잔액
(7, '우리은행 주택담보대출', 24, 7, 400000),   -- 2000년생, 2024년 기준 24세, 7월 잔액
(8, '우리은행 주택담보대출', 24, 8, 300000),   -- 2000년생, 2024년 기준 24세, 8월 잔액
(9, '우리은행 주택담보대출', 24, 9, 200000),   -- 2000년생, 2024년 기준 24세, 9월 잔액
(10, '우리은행 주택담보대출', 24, 10, 100000), -- 2000년생, 2024년 기준 24세, 10월 잔액
(11, '우리은행 주택담보대출', 24, 11, 50000),  -- 2000년생, 2024년 기준 24세, 11월 잔액
(12, '우리은행 주택담보대출', 24, 12, 0);      -- 2000년생, 2024년 기준 24세, 12월 잔액

-- 5. radish 테이블에 데이터 삽입 (이미 존재할 경우 삽입 무시)
INSERT IGNORE INTO radish (radish_id, radish_name, radish_image_url, radish_rank, created_date, modified_date) VALUES
(1, '무', 'https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9', 'B', '2024-08-23 12:00:00', '2024-08-23 12:00:00'),
(2, '무산소', 'https://github.com/user-attachments/assets/989d6ac6-39d1-4f24-85aa-ac2c6deedc4c', 'B', '2024-08-23 12:05:00', '2024-08-23 12:05:00'),
(3, '응애무', 'https://github.com/user-attachments/assets/67db296c-70b7-422c-bc1f-8fab92414dc6', 'B', '2024-08-23 12:10:00', '2024-08-23 12:10:00'),
(4, '발그레무', 'https://github.com/user-attachments/assets/29766555-5bb9-4848-88c3-79039ecaa61a', 'B', '2024-08-23 12:15:00', '2024-08-23 12:15:00'),
(5, '물구나무', 'https://github.com/user-attachments/assets/55610e6e-e7a0-41f9-b81a-d41ce79bdbe8', 'B', '2024-08-23 12:20:00', '2024-08-23 12:20:00'),
(6, '머리숱많아무', 'https://github.com/user-attachments/assets/474185cd-9469-4394-a0b9-48fd189b66d4', 'B', '2024-08-23 12:25:00', '2024-08-23 12:25:00'),
(7, '무신사', 'https://github.com/user-attachments/assets/5a28373c-c434-4d2b-8df9-27dc48c6df05', 'B', '2024-08-23 12:30:00', '2024-08-23 12:30:00'),
(8, '무지개', 'https://github.com/user-attachments/assets/28b348f4-cd9e-4a65-9390-49bec79af10f', 'B', '2024-08-23 12:40:00', '2024-08-23 12:40:00'),
(9, '무급휴가', 'https://github.com/user-attachments/assets/0bd57d4a-f59f-4cdc-ba71-5ce07a37bf9e', 'B', '2024-08-23 12:50:00', '2024-08-23 12:50:00'),
(10, '아련하무', 'https://github.com/user-attachments/assets/eb74b691-4b58-4532-bf7d-087bc944a844', 'B', '2024-08-23 12:55:00', '2024-08-23 12:55:00');

-- 6. test@gmail.com 회원의 대출 상환 기록 더미 데이터 생성
-- Loan Product 1 상환 기록 (월 상환 금액: 27,778원)
INSERT IGNORE INTO loan_repayment_record (loan_repayment_record_id, create_at, member_loan_id, repayment_balance, repayment_date, update_at, day, month, year) VALUES
(1, '2024-01-01 12:00:00', 1, 27778, '2024-01-01 12:00:00', '2024-01-01 12:00:00', 1, 1, 2024),
(2, '2024-02-01 12:00:00', 1, 27778, '2024-02-01 12:00:00', '2024-02-01 12:00:00', 1, 2, 2024),
(3, '2024-03-01 12:00:00', 1, 27778, '2024-03-01 12:00:00', '2024-03-01 12:00:00', 1, 3, 2024),
(4, '2024-04-01 12:00:00', 1, 27778, '2024-04-01 12:00:00', '2024-04-01 12:00:00', 1, 4, 2024),
(5, '2024-05-01 12:00:00', 1, 27778, '2024-05-01 12:00:00', '2024-05-01 12:00:00', 1, 5, 2024);

-- Loan Product 2 상환 기록 (월 상환 금액: 55,556원, 2월부터 시작)
INSERT IGNORE INTO loan_repayment_record (loan_repayment_record_id, create_at, member_loan_id, repayment_balance, repayment_date, update_at, day, month, year) VALUES
(6, '2024-02-01 12:00:00', 2, 55556, '2024-02-01 12:00:00', '2024-02-01 12:00:00', 1, 2, 2024),
(7, '2024-03-01 12:00:00', 2, 55556, '2024-03-01 12:00:00', '2024-03-01 12:00:00', 1, 3, 2024),
(8, '2024-04-01 12:00:00', 2, 55556, '2024-04-01 12:00:00', '2024-04-01 12:00:00', 1, 4, 2024),
(9, '2024-05-01 12:00:00', 2, 55556, '2024-05-01 12:00:00', '2024-05-01 12:00:00', 1, 5, 2024),
(10, '2024-06-01 12:00:00', 2, 55556, '2024-06-01 12:00:00', '2024-06-01 12:00:00', 1, 6, 2024);

-- Loan Product 3 상환 기록 (월 상환 금액: 83,333원, 3월부터 시작)
INSERT IGNORE INTO loan_repayment_record (loan_repayment_record_id, create_at, member_loan_id, repayment_balance, repayment_date, update_at, day, month, year) VALUES
(11, '2024-03-01 12:00:00', 3, 83333, '2024-03-01 12:00:00', '2024-03-01 12:00:00', 1, 3, 2024),
(12, '2024-04-01 12:00:00', 3, 83333, '2024-04-01 12:00:00', '2024-04-01 12:00:00', 1, 4, 2024),
(13, '2024-05-01 12:00:00', 3, 83333, '2024-05-01 12:00:00', '2024-05-01 12:00:00', 1, 5, 2024),
(14, '2024-06-01 12:00:00', 3, 83333, '2024-06-01 12:00:00', '2024-06-01 12:00:00', 1, 6, 2024),
(15, '2024-07-01 12:00:00', 3, 83333, '2024-07-01 12:00:00', '2024-07-01 12:00:00', 1, 7, 2024);

-- Loan Product 4 상환 기록 (월 상환 금액: 111,111원, 4월부터 시작)
INSERT IGNORE INTO loan_repayment_record (loan_repayment_record_id, create_at, member_loan_id, repayment_balance, repayment_date, update_at, day, month, year) VALUES
(16, '2024-04-01 12:00:00', 4, 111111, '2024-04-01 12:00:00', '2024-04-01 12:00:00', 1, 4, 2024),
(17, '2024-05-01 12:00:00', 4, 111111, '2024-05-01 12:00:00', '2024-05-01 12:00:00', 1, 5, 2024),
(18, '2024-06-01 12:00:00', 4, 111111, '2024-06-01 12:00:00', '2024-06-01 12:00:00', 1, 6, 2024),
(19, '2024-07-01 12:00:00', 4, 111111, '2024-07-01 12:00:00', '2024-07-01 12:00:00', 1, 7, 2024),
(20, '2024-08-01 12:00:00', 4, 111111, '2024-08-01 12:00:00', '2024-08-01 12:00:00', 1, 8, 2024);

-- Loan Product 5 상환 기록 (월 상환 금액: 138,889원, 5월부터 시작)
INSERT IGNORE INTO loan_repayment_record (loan_repayment_record_id, create_at, member_loan_id, repayment_balance, repayment_date, update_at, day, month, year) VALUES
(21, '2024-05-01 12:00:00', 5, 138889, '2024-05-01 12:00:00', '2024-05-01 12:00:00', 1, 5, 2024),
(22, '2024-06-01 12:00:00', 5, 138889, '2024-06-01 12:00:00', '2024-06-01 12:00:00', 1, 6, 2024),
(23, '2024-07-01 12:00:00', 5, 138889, '2024-07-01 12:00:00', '2024-07-01 12:00:00', 1, 7, 2024),
(24, '2024-08-01 12:00:00', 5, 138889, '2024-08-01 12:00:00', '2024-08-01 12:00:00', 1, 8, 2024),
(25, '2024-09-01 12:00:00', 5, 138889, '2024-09-01 12:00:00', '2024-09-01 12:00:00', 1, 9, 2024);

-- 7. Account 테이블에 데이터 삽입 (이미 존재할 경우 삽입 무시)
INSERT IGNORE INTO account (account_id, account_num, member_id, account_balance) VALUES
(1, '123-456-789', (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 1000000),
(2, '123-456-790', (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 2000000),
(3, '123-456-791', (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 3000000),
(4, '123-456-792', (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 4000000),
(5, '123-456-793', (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 5000000);

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

-- 10. Quiz 테이블에 더미 데이터 삽입 (이미 존재할 경우 삽입 무시)
INSERT IGNORE INTO quiz (quiz_id, created_date, modified_date, answer, ended_at, example, is_correct, status, member_id)
VALUES
(1, NOW(), NOW(), 200000, DATE_ADD(NOW(), INTERVAL 1 HOUR), 150000, 0, 'NOT_STARTED', 1);


-- 12. Account Product 테이블에 상품 데이터 삽입
INSERT IGNORE INTO Account_Product (id, bank_Code, account_Name, account_Description, account_Type_Unique_No)
VALUES
(1, '001', '한국은행 수시입출금 상품', '자유로운 수시입출금', '001-1-51798480913047'),
(2, '003', 'IBK기업은행 자유입출금통장', 'IBK기업은행의 개인 및 소상공인을 위한 자유입출금 계좌입니다.', '003-1-c13adbc5193e4e'),
(3, '004', 'KB국민은행 자유입출금통장', 'KB국민은행의 인기 있는 자유입출금 계좌로, 다양한 금융 서비스를 편리하게 이용할 수 있습니다.', '004-1-3e3de8b682fb43'),
(4, '020', '우리은행 자유입출금계좌', '우리은행의 기본 자유입출금 계좌로, 입출금이 자유롭고 다양한 혜택을 제공합니다.', '020-1-ed57896c14f04d'),
(5, '081', '하나은행 자유입출금계좌', '하나은행의 자유입출금 계좌로, 입출금이 자유롭고 다양한 금융 서비스를 제공합니다.', '081-1-8b171a6b846c4e'),
(6, '088', '신한은행 자유통장', '신한은행의 자유로운 입출금 계좌로, 편리한 금융 생활을 위한 필수 계좌입니다.', '088-1-ba3e624fcec04c'),
(7, '090', '카카오뱅크 자유입출금계좌', '카카오뱅크의 자유입출금 계좌로, 모바일에서 간편하게 관리할 수 있는 현대적인 계좌입니다.', '090-1-5673fb2930a740');
