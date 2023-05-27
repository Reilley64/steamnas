package me.reilley.steamnas;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.AsyncTaskExecutor;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ConcurrentTaskExecutor;

@Configuration
@EnableAsync
@EnableFeignClients
@EnableScheduling
public class SteamnasAppConfig {
    @Bean
    public AsyncTaskExecutor taskExecutor() {
        return new ConcurrentTaskExecutor();
    }
}
