import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert,
} from 'typeorm';
import { IsISBN, IsNumber, IsString } from 'class-validator';

import { IsISBNAlreadyExist, IsNotBlank } from '../lib/validator';

@Entity('books')
export class Book extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@IsISBN()
	@IsISBNAlreadyExist({
		message: 'ISBN already exist in the database',
	})
	isbn: string;

	@Column()
	@IsString()
	@IsNotBlank('title', { message: 'Title field cannot be blank' })
	title: string;

	@Column()
	@IsString()
	@IsNotBlank('subject', { message: 'Subject field cannot be blank' })
	subject: string;

	@Column()
	@IsString()
	@IsNotBlank('publisher', { message: 'Publisher field cannot be blank' })
	publisher: string;

	@Column()
	@IsString()
	@IsNotBlank('language', { message: 'Language field cannot be blank' })
	language: string;

	@Column()
	@IsNumber()
	number_of_pages: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@BeforeInsert()
	trimStrings() {
		this.title = this.title.trim();
		this.subject = this.subject.trim();
		this.publisher = this.publisher.trim();
		this.language = this.language.trim();
	}
}
