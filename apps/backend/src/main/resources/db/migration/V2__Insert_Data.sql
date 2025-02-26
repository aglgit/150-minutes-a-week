-- Insert data into the events table in my_schema
INSERT INTO my_schema.users (id)
VALUES ('alef@example.com');

INSERT INTO my_schema.events (id, user_id, activity, start_time, end_time)
VALUES (1, 'alef@example.com', 'Walking', '2025-02-11 09:00:00+00', '2025-02-11 10:00:00+00'),
       (2, 'alef@example.com', 'Running', '2025-01-30 18:00:00+00', '2025-01-30 19:30:00+00'),
       (3, 'alef@example.com', 'Biking', '2025-01-15 18:00:00+00', '2025-01-15 19:30:00+00'),
       (4, 'alef@example.com', 'Swimming', '2025-02-16 10:00:00+00', '2025-02-16 10:20:00+00'),
       (5, 'alef@example.com', 'Walking', '2025-02-16 12:00:00+00', '2025-02-16 12:30:00+00'),
       (6, 'alef@example.com', 'Moderate', '2025-02-27 14:00:00+00', '2025-02-27 14:30:00+00'),
       (7, 'alef@example.com', 'Vigorous', '2025-03-07 18:00:00+00', '2025-03-07 19:00:00+00');
