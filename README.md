# Mass App
Massは質量の意味です。
仕事は質だけでも、量だけでも評価できません。
量と質を伴って、仕事をする人、受ける人が満足すると思い、作りました。
仕事を依頼する人、受ける人がお互い満足できるようにアップデートします。

# Link
作成中
完成次第、アップデートします。

# ID/Pass
作成中
完成次第、アップデートします。
 - ID: ***
 - Pass: ***

 - テストID：***
 - テストPass：***


# Description
 - 依頼した仕事は完成度100%だと、どのくらいの時間がかかる？
 - 依頼した仕事の優先度は？
 - 依頼した仕事内容と質のバランスはどうする？

など、依頼した仕事の量と質のバランスを取るためのアプリケーションです。
依頼者が仕事の優先度をつけながら、受け手を行います。
日々のお互いのコミュニケーションを円滑にして、お互いウィンウィンにすることを目的にしています。

# Preview
作成中
完成次第、アップデートします。

# Demo
作成中
完成次第、アップデートします。

# Usage
作成中
完成次第、アップデートします。

# Plan
- DB設計
- 依頼時間・所要時間・タスク内容などを実施日に見える化をします。


# Requirement
- Ruby On Rails 6.0.0
- MySQL
- JavaScript
- jQuery
- Heroku

# DataBase
## Users テーブル
| Column                | Type    | Options      |
| --------------------- | ------- | ------------ |
| name                  | string  | null: false  |
| email                 | string  | null: false  |
| password_confirmation | string  | null: false  | 

### Association
- has_many :task_logs
- has_many :comments
- has_many :requires
- has_many :done_tasks

## Requires テーブル
| Column                  | Type       | Options                        |
| ----------------------- | ---------- | ------------------------------ |
| user                    | references | null: false,foreign_key: true  |
| task_log                | references | null: false,foreign_key: true  |
| require_text            | string     | null: false                    |
| image                   | img        |                                |
| priority                | integer    | null: false                    |

### Association
- belongs_to :user
- belongs_to :done_task
- has_many :task_logs

## Comments テーブル
| Column                  | Type       | Options                        |
| ----------------------- | ---------- | ------------------------------ |
| user                    | references | null: false,foreign_key: true  |
| done_task_log           | references | null: false,foreign_key: true  |
| text                    | string     | null: false                    |
| image                   | img        |                                |
| date                    | date       | null: false                    |

### Association
- belongs_to :user
- belongs_to :task_log

## Done_tasks テーブル
| Column                  | Type       | Options                        |
| ----------------------- | ---------- | ------------------------------ |
| user                    | references | null: false,foreign_key: true  |
| require                 | references | null: false,foreign_key: true  |
| task_log                | references | null: false,foreign_key: true  |
| working_time            | integer    | null: false                    |
| done_text               | text       | null: false                    |
| image                   | img        | null: false                    |

### Association
- belongs_to :user
- belongs_to :require
- belongs_to :task_log

## Task_logs テーブル
| Column                  | Type       | Options                        |
| ----------------------- | ---------- | ------------------------------ |
| date                    | date       | null: false                    |
| user                    | references | null: false,foreign_key: true  |
| task                    | references | null: false,foreign_key: true  |
| comment                 | references | null: false,foreign_key: true  |

### Association
- belongs_to :user
- belongs_to :require
- belongs_to :comment
- has_many :tasks, through: :task_log_task
- has_many :done_tasks

## Tasks テーブル
| Column                  | Type       | Options                        |
| ----------------------- | ---------- | ------------------------------ |
| task_log                | references | null: false,foreign_key: true  |
| task                    | string     | null: false                    |
| normal_time             | integer    | null: false                    |

### Association
- has_many :task_logs, through: :task_log_task

## Task_log_Task テーブル
| Column                  | Type       | Options                        |
| ----------------------- | ---------- | ------------------------------ |
| task_log                | references | null: false,foreign_key: true  |
| task                    | references | null: false,foreign_key: true  |

### Association
- belongs_to :task
- belongs_to :task_log