import { Request, Response } from 'express';

import { handleClassValidatorError } from '../lib/errorHandler';
import { Book } from '../entity/Book';

// Add a book
export const addBook_post = async (req: Request, res: Response) => {
	try {
		const book = Book.create({
			isbn: req.body.isbn,
			title: req.body.title,
			subject: req.body.subject,
			publisher: req.body.publisher,
			language: req.body.language,
			number_of_pages: req.body.number_of_pages,
		});

		// Validate book
		const err = await handleClassValidatorError(book);
		if (err) {
			res.status(400).json(err);
			return;
		}

		// Save new book to database
		await book.save();

		res.status(201).json({
			success: true,
			message: 'Book created successfully',
			book,
		});
	} catch (err) {
		res.status(500).json({
			error: true,
			message: 'Internal server error',
		});
	}
};

// Get all books
export const getAllBooks_get = (req: Request, res: Response) => {
	//
};

// Get single book
export const getBook_get = (req: Request, res: Response) => {
	//
};

// Update a book
export const updateBook_patch = (req: Request, res: Response) => {
	//
};

// Delete a book
export const deleteBook_delete = (req: Request, res: Response) => {
	//
};
