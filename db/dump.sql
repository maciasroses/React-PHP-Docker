
CREATE TABLE `user` (
    id CHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    session_id VARCHAR(64) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DELIMITER $$

CREATE TRIGGER `before_insert_user`
BEFORE INSERT ON `user`
FOR EACH ROW
BEGIN
    SET NEW.id = UUID();
END$$

DELIMITER ;

CREATE TABLE accounting (
    id CHAR(36) PRIMARY KEY,
    date DATE NOT NULL,
    description TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency ENUM('USD', 'MXN', 'EUR', 'GBP') NOT NULL,
    type ENUM('Income', 'Expense', 'Transfer') NOT NULL,
    user_id CHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

DELIMITER $$

CREATE TRIGGER `before_insert_accounting` 
BEFORE INSERT ON `accounting` 
FOR EACH ROW 
BEGIN
    SET NEW.id = UUID();
END$$ 

DELIMITER ;

INSERT INTO user (email, password, name, role)
VALUES (
        'user@example.com',
        "$2y$10$l0qlUCItZb6JXVc88fUiKuoOw/6noKFPyGFhBBIAXkUcb5ST9miOS",
        'User Name',
        'user'
    ),
    (
        'admin@example.com',
        "$2y$10$l0qlUCItZb6JXVc88fUiKuoOw/6noKFPyGFhBBIAXkUcb5ST9miOS",
        'Admin Name',
        'admin'
    );
INSERT INTO accounting (
        date,
        description,
        amount,
        currency,
        type,
        user_id
    )
VALUES (
        '2024-08-15',
        'Transfer to savings account',
        500.00,
        'USD',
        'transfer',
        (
            SELECT `id`
            FROM `user`
            WHERE `email` = 'user@example.com'
        )
    ),
    (
        '2024-08-16',
        'Reimbursement for office supplies',
        150.00,
        'USD',
        'income',
        (
            SELECT `id`
            FROM `user`
            WHERE `email` = 'user@example.com'
        )
    ),
    (
        '2024-08-17',
        'Transfer from checking to business account',
        1000.00,
        'USD',
        'transfer',
        (
            SELECT `id`
            FROM `user`
            WHERE `email` = 'admin@example.com'
        )
    ),
    (
        '2024-08-18',
        'Utility bill payment',
        200.00,
        'GBP',
        'expense',
        (
            SELECT `id`
            FROM `user`
            WHERE `email` = 'user@example.com'
        )
    ),
    (
        '2024-08-19',
        'Refund from supplier',
        300.00,
        'EUR',
        'income',
        (
            SELECT `id`
            FROM `user`
            WHERE `email` = 'admin@example.com'
        )
    ),
    (
        '2024-08-20',
        'Transfer to investment account',
        750.00,
        'EUR',
        'transfer',
        (
            SELECT `id`
            FROM `user`
            WHERE `email` = 'admin@example.com'
        )
    ),
    (
        '2024-08-21',
        'Salary transfer',
        2500.00,
        'MXN',
        'transfer',
        (
            SELECT `id`
            FROM `user`
            WHERE `email` = 'user@example.com'
        )
    ),
    (
        '2024-08-22',
        'Annual conference expenses',
        500.00,
        'USD',
        'expense',
        (
            SELECT `id`
            FROM `user`
            WHERE `email` = 'user@example.com'
        )
    ),
    (
        '2024-08-23',
        'Revenue from online sales',
        3200.00,
        'USD',
        'income',
        (
            SELECT `id`
            FROM `user`
            WHERE `email` = 'admin@example.com'
        )
    ),
    (
        '2024-08-24',
        'Internal transfer to operational account',
        1200.00,
        'GBP',
        'transfer',
        (
            SELECT `id`
            FROM `user`
            WHERE `email` = 'admin@example.com'
        )
    );