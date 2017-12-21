package com.mycompany.myapp.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache("users", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Permissao.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Permissao.class.getName() + ".usuarios", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Usuario.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Aluno.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Aluno.class.getName() + ".faltas", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Aluno.class.getName() + ".notas", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Aluno.class.getName() + ".entregas", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Professor.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Professor.class.getName() + ".turmas", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Professor.class.getName() + ".atividades", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Professor.class.getName() + ".disciplinas", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Falta.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Nota.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Turma.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Turma.class.getName() + ".alunos", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Turma.class.getName() + ".aulas", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Disciplina.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Disciplina.class.getName() + ".atividades", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Disciplina.class.getName() + ".professors", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Aula.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Aula.class.getName() + ".faltas", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Atividade.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Atividade.class.getName() + ".notas", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Atividade.class.getName() + ".entregas", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.PeriodoLetivo.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.PeriodoLetivo.class.getName() + ".faltas", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.PeriodoLetivo.class.getName() + ".aulas", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Entrega.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
