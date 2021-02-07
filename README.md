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
## users テーブル
| Column                | Type    | Options      |
| --------------------- | ------- | ------------ |
| name                  | string  | null: false  |
| email                 | string  | null: false  |
| password_confirmation | string  | null: false  | 

### Association
- has_many :task_logs
- has_many :comments
- has_many :requires

## Requires テーブル
| Column                  | Type       | Options                        |
| ----------------------- | ---------- | ------------------------------ |
| user                    | references | null: false,foreign_key: true  |
| task_log                | references | null: false,foreign_key: true  |
| text                    | string     | null: false                    |
| image                   | img        |                                |
| date                    | date       | null: false                    |
| done                    | string     |                                |

### Association
- belongs_to :user

## Comments テーブル
| Column                  | Type       | Options                        |
| ----------------------- | ---------- | ------------------------------ |
| user                    | references | null: false,foreign_key: true  |
| task_log                | references | null: false,foreign_key: true  |
| text                    | string     | null: false                    |
| image                   | img        |                                |
| date                    | date       | null: false                    |

### Association
- belongs_to :user

## Task_logs テーブル
| Column                  | Type       | Options                        |
| ----------------------- | ---------- | ------------------------------ |
| date                    | date       | null: false                    |
| user                    | references | null: false,foreign_key: true  |
| task                    | references | null: false,foreign_key: true  |

### Association
- belongs_to :user
- has_many :tasks, through: :task_log_task

## Tasks テーブル
| Column                  | Type       | Options                        |
| ----------------------- | ---------- | ------------------------------ |
| date                    | date       | null: false                    |
| task                    | string     | null: false                    |
| working_time            | integer    | null: false                    |
| normal_time             | integer    | null: false                    |
| task_log                | references | null: false,foreign_key: true  |

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