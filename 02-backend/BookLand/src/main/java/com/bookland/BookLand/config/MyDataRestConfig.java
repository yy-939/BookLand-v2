package com.bookland.BookLand.config;

import com.bookland.BookLand.entity.Book;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private String theAllowedOrigins = "http://localhost:3000";

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = {
                HttpMethod.DELETE,
                HttpMethod.PATCH,
                HttpMethod.POST,
                HttpMethod.PUT};

        config.exposeIdsFor(Book.class);
        disableHttpMethods(Book.class, config, theUnsupportedActions);

        /* Configure CORS Mapping */
        cors.addMapping("/**")
                .allowedOrigins(theAllowedOrigins);
    }

    private void disableHttpMethods(Class<?> theClass,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }
}
