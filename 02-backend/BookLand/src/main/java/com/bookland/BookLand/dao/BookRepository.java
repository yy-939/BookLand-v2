package com.bookland.BookLand.dao;

import com.bookland.BookLand.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {


}
