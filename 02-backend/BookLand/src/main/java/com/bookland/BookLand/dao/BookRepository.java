package com.bookland.BookLand.dao;

import com.bookland.BookLand.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

// http://localhost:8080/api/books/search：
// 默认情况下，Spring Data REST 会根据实体类的名称生成路径。例如，Book 实体的路径会是 /books
// Spring Data REST 使用 /search 作为搜索端点的基础路径，这是其默认行为。
// 这个行为的目的是将所有自定义的查询方法
//（例如以 findBy、queryBy、readBy、getBy 等前缀命名的方法）归类到一个单独的路径下


// JpaRepository<Book, Long>：
//  Book 是entity类类型，表示这个仓库将管理 Book entity。
//  Long 是entity的primary key类型，表示 Book 实体的primary key (id)是 Long 类型。
public interface BookRepository extends JpaRepository<Book, Long> {

    // http://localhost:8080/api/books/search/findByTitleContaining?title=Spring
    Page<Book> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);

    // http://localhost:8080/api/books/search/findByCategory?category=fe
    Page<Book> findByCategory(@RequestParam("category") String category, Pageable pageable);
}
