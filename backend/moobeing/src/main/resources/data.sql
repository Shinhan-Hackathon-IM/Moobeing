-- 1. 맴버 생성
INSERT IGNORE INTO member (member_id, email, password, total_points, total_loan, name, gender, birthday, user_key, selected_radish_id)
VALUES (1, 'test@gmail.com', 'test', 0, 0, 'Test User', 'M', '000101', 'user_key_123', 1);

-- 2. 대출 상품 더미 데이터 10개 생성
INSERT IGNORE INTO loan_product (loan_product_id, loan_name, bank_image_url, bank_name, loan_period, interest_rate, description) VALUES
(1, 'Loan Product 1', 'https://example.com/bank1.png', 'Bank 1', 36, 3.5, 'Description for Loan Product 1'),
(2, 'Loan Product 2', 'https://example.com/bank2.png', 'Bank 2', 48, 4.0, 'Description for Loan Product 2'),
(3, 'Loan Product 3', 'https://example.com/bank3.png', 'Bank 3', 24, 2.8, 'Description for Loan Product 3'),
(4, 'Loan Product 4', 'https://example.com/bank4.png', 'Bank 4', 60, 4.5, 'Description for Loan Product 4'),
(5, 'Loan Product 5', 'https://example.com/bank5.png', 'Bank 5', 72, 5.0, 'Description for Loan Product 5'),
(6, 'Loan Product 6', 'https://example.com/bank6.png', 'Bank 6', 36, 3.2, 'Description for Loan Product 6'),
(7, 'Loan Product 7', 'https://example.com/bank7.png', 'Bank 7', 48, 4.1, 'Description for Loan Product 7'),
(8, 'Loan Product 8', 'https://example.com/bank8.png', 'Bank 8', 24, 2.9, 'Description for Loan Product 8'),
(9, 'Loan Product 9', 'https://example.com/bank9.png', 'Bank 9', 60, 4.3, 'Description for Loan Product 9'),
(10, 'Loan Product 10', 'https://example.com/bank10.png', 'Bank 10', 72, 5.2, 'Description for Loan Product 10');

-- 3. test@gmail.com으로 대출 상품 5개 가입시키기
INSERT IGNORE INTO member_loan (member_loan_id, member_id, loan_product_name, status, initial_balance, remaining_balance, start_loan, repayment_deadline) VALUES
(1, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 'Loan Product 1', 'Active', 1000000, 900000, '2024-01-01', '2025-01-01'),
(2, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 'Loan Product 2', 'Active', 2000000, 1800000, '2024-02-01', '2025-02-01'),
(3, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 'Loan Product 3', 'Active', 3000000, 2700000, '2024-03-01', '2025-03-01'),
(4, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 'Loan Product 4', 'Active', 4000000, 3600000, '2024-04-01', '2025-04-01'),
(5, (SELECT member_id FROM member WHERE email = 'test@gmail.com'), 'Loan Product 5', 'Active', 5000000, 4500000, '2024-05-01', '2025-05-01');

-- 4. 대출 상품의 또래들 2000년생에 대한 더미데이터 생성
-- 4. 대출 상품의 또래들 2000년생에 대한 더미데이터 생성
INSERT IGNORE INTO average_loan_repayment_record (average_loan_repayment_record_id, loan_name, age, month, repayment_balance) VALUES
(1, 'Loan Product 1', 24, 1, 1000000),  -- 2000년생, 2024년 기준 24세, 1월 잔액
(2, 'Loan Product 1', 24, 2, 900000),   -- 2000년생, 2024년 기준 24세, 2월 잔액
(3, 'Loan Product 1', 24, 3, 800000),   -- 2000년생, 2024년 기준 24세, 3월 잔액
(4, 'Loan Product 1', 24, 4, 700000),   -- 2000년생, 2024년 기준 24세, 4월 잔액
(5, 'Loan Product 1', 24, 5, 600000),   -- 2000년생, 2024년 기준 24세, 5월 잔액
(6, 'Loan Product 1', 24, 6, 500000),   -- 2000년생, 2024년 기준 24세, 6월 잔액
(7, 'Loan Product 1', 24, 7, 400000),   -- 2000년생, 2024년 기준 24세, 7월 잔액
(8, 'Loan Product 1', 24, 8, 300000),   -- 2000년생, 2024년 기준 24세, 8월 잔액
(9, 'Loan Product 1', 24, 9, 200000),   -- 2000년생, 2024년 기준 24세, 9월 잔액
(10, 'Loan Product 1', 24, 10, 100000), -- 2000년생, 2024년 기준 24세, 10월 잔액
(11, 'Loan Product 1', 24, 11, 50000),  -- 2000년생, 2024년 기준 24세, 11월 잔액
(12, 'Loan Product 1', 24, 12, 0);      -- 2000년생, 2024년 기준 24세, 12월 잔액


-- 5. radish 테이블에 데이터 삽입 (이미 존재할 경우 삽입 무시)
INSERT IGNORE INTO radish (radish_id, radish_name, radish_image_url, radish_rank, created_date, modified_date) VALUES
(1, 'basicRad', 'https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9', 'B', '2024-08-23 12:00:00', '2024-08-23 12:00:00'),
(2, 'aniRad', 'https://github.com/user-attachments/assets/989d6ac6-39d1-4f24-85aa-ac2c6deedc4c', 'B', '2024-08-23 12:05:00', '2024-08-23 12:05:00'),
(3, 'babyRad', 'https://github.com/user-attachments/assets/67db296c-70b7-422c-bc1f-8fab92414dc6', 'B', '2024-08-23 12:10:00', '2024-08-23 12:10:00'),
(4, 'blushRad', 'https://github.com/user-attachments/assets/29766555-5bb9-4848-88c3-79039ecaa61a', 'B', '2024-08-23 12:15:00', '2024-08-23 12:15:00'),
(5, 'flippedRad', 'https://github.com/user-attachments/assets/55610e6e-e7a0-41f9-b81a-d41ce79bdbe8', 'B', '2024-08-23 12:20:00', '2024-08-23 12:20:00'),
(6, 'hairlotRad', 'https://github.com/user-attachments/assets/474185cd-9469-4394-a0b9-48fd189b66d4', 'B', '2024-08-23 12:25:00', '2024-08-23 12:25:00'),
(7, 'musinsaRad', 'https://github.com/user-attachments/assets/5a28373c-c434-4d2b-8df9-27dc48c6df05', 'B', '2024-08-23 12:30:00', '2024-08-23 12:30:00'),
(8, 'pot', 'https://github.com/user-attachments/assets/f376d8fb-ff80-4a20-b666-a95413e96b30', 'B', '2024-08-23 12:35:00', '2024-08-23 12:35:00'),
(9, 'rainbowRad', 'https://github.com/user-attachments/assets/28b348f4-cd9e-4a65-9390-49bec79af10f', 'B', '2024-08-23 12:40:00', '2024-08-23 12:40:00'),
(10, 'soil', 'https://github.com/user-attachments/assets/7bcff5a8-7233-4077-a9aa-cf73a53a9220', 'B', '2024-08-23 12:45:00', '2024-08-23 12:45:00'),
(11, 'vacationRad', 'https://github.com/user-attachments/assets/0bd57d4a-f59f-4cdc-ba71-5ce07a37bf9e', 'B', '2024-08-23 12:50:00', '2024-08-23 12:50:00'),
(12, 'weightRad', 'https://github.com/user-attachments/assets/eb74b691-4b58-4532-bf7d-087bc944a844', 'B', '2024-08-23 12:55:00', '2024-08-23 12:55:00');

-- 6. test@gmail.com 회원의 대출 상환 기록 더미 데이터 생성
INSERT IGNORE INTO loan_repayment_record (loan_repayment_record_id, create_at, day, member_loan_id, month, repayment_balance, repayment_date, update_at, year) VALUES
(1, '2024-01-01 12:00:00', 1, 1, 1, 900000, '2024-01-01 12:00:00', '2024-01-01 12:00:00', 2024),
(2, '2024-02-01 12:00:00', 1, 1, 2, 800000, '2024-02-01 12:00:00', '2024-02-01 12:00:00', 2024),
(3, '2024-03-01 12:00:00', 1, 1, 3, 700000, '2024-03-01 12:00:00', '2024-03-01 12:00:00', 2024),
(4, '2024-04-01 12:00:00', 1, 1, 4, 600000, '2024-04-01 12:00:00', '2024-04-01 12:00:00', 2024),
(5, '2024-05-01 12:00:00', 1, 1, 5, 500000, '2024-05-01 12:00:00', '2024-05-01 12:00:00', 2024),

(6, '2024-01-01 12:00:00', 1, 2, 1, 1800000, '2024-01-01 12:00:00', '2024-01-01 12:00:00', 2024),
(7, '2024-02-01 12:00:00', 1, 2, 2, 1600000, '2024-02-01 12:00:00', '2024-02-01 12:00:00', 2024),
(8, '2024-03-01 12:00:00', 1, 2, 3, 1400000, '2024-03-01 12:00:00', '2024-03-01 12:00:00', 2024),
(9, '2024-04-01 12:00:00', 1, 2, 4, 1200000, '2024-04-01 12:00:00', '2024-04-01 12:00:00', 2024),
(10, '2024-05-01 12:00:00', 1, 2, 5, 1000000, '2024-05-01 12:00:00', '2024-05-01 12:00:00', 2024),

(11, '2024-01-01 12:00:00', 1, 3, 1, 2700000, '2024-01-01 12:00:00', '2024-01-01 12:00:00', 2024),
(12, '2024-02-01 12:00:00', 1, 3, 2, 2400000, '2024-02-01 12:00:00', '2024-02-01 12:00:00', 2024),
(13, '2024-03-01 12:00:00', 1, 3, 3, 2100000, '2024-03-01 12:00:00', '2024-03-01 12:00:00', 2024),
(14, '2024-04-01 12:00:00', 1, 3, 4, 1800000, '2024-04-01 12:00:00', '2024-04-01 12:00:00', 2024),
(15, '2024-05-01 12:00:00', 1, 3, 5, 1500000, '2024-05-01 12:00:00', '2024-05-01 12:00:00', 2024),

(16, '2024-01-01 12:00:00', 1, 4, 1, 3600000, '2024-01-01 12:00:00', '2024-01-01 12:00:00', 2024),
(17, '2024-02-01 12:00:00', 1, 4, 2, 3200000, '2024-02-01 12:00:00', '2024-02-01 12:00:00', 2024),
(18, '2024-03-01 12:00:00', 1, 4, 3, 2800000, '2024-03-01 12:00:00', '2024-03-01 12:00:00', 2024),
(19, '2024-04-01 12:00:00', 1, 4, 4, 2400000, '2024-04-01 12:00:00', '2024-04-01 12:00:00', 2024),
(20, '2024-05-01 12:00:00', 1, 4, 5, 2000000, '2024-05-01 12:00:00', '2024-05-01 12:00:00', 2024),

(21, '2024-01-01 12:00:00', 1, 5, 1, 4500000, '2024-01-01 12:00:00', '2024-01-01 12:00:00', 2024),
(22, '2024-02-01 12:00:00', 1, 5, 2, 4000000, '2024-02-01 12:00:00', '2024-02-01 12:00:00', 2024),
(23, '2024-03-01 12:00:00', 1, 5, 3, 3500000, '2024-03-01 12:00:00', '2024-03-01 12:00:00', 2024),
(24, '2024-04-01 12:00:00', 1, 5, 4, 3000000, '2024-04-01 12:00:00', '2024-04-01 12:00:00', 2024),
(25, '2024-05-01 12:00:00', 1, 5, 5, 2500000, '2024-05-01 12:00:00', '2024-05-01 12:00:00', 2024);
