package com.uol.finalproject.edulearn;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
@Transactional
@Slf4j
@ActiveProfiles("test")
public class BaseIntegrationTest {

}
