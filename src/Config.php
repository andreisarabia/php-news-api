<?php

final class Config
{
    private static $settings = NULL;

    private static function loadConfigurationFile()
    {
      if (self::$settings === NULL) {
        self::$settings = parse_ini_file(dirname(__FILE__) . '/../config/php.newsapi.ini');
      }
    }

    public static function get($key) {
      self::loadConfigurationFile();

      return self::$settings[$key];
    }
}
