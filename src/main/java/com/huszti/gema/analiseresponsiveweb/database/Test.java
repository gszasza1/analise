package com.huszti.gema.analiseresponsiveweb.database;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;

@Data
@Document(collection = "test")
public class Test {

    @Id
    private String id;
    private String title;
    private String type;
    private String time;
    private String creator;
    private LocalDate creationTime;


    public Test() {
        creationTime= LocalDate.now();
    }
}
