-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema yatzy
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema yatzy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `yatzy` DEFAULT CHARACTER SET utf8 ;
USE `yatzy` ;

-- -----------------------------------------------------
-- Table `yatzy`.`players`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yatzy`.`players` (
  `userName` VARCHAR(45) NOT NULL,
  `nbrOfWins` INT NOT NULL,
  PRIMARY KEY (`userName`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `yatzy`.`games`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yatzy`.`games` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `yatzy`.`games_has_players`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yatzy`.`games_has_players` (
  `games_id` INT NOT NULL,
  `players_userName` VARCHAR(45) NOT NULL,
  `points` INT NOT NULL,
  PRIMARY KEY (`games_id`, `players_userName`),
  INDEX `fk_games_has_players_players1_idx` (`players_userName` ASC),
  INDEX `fk_games_has_players_games_idx` (`games_id` ASC),
  CONSTRAINT `fk_games_has_players_games`
    FOREIGN KEY (`games_id`)
    REFERENCES `yatzy`.`games` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_games_has_players_players1`
    FOREIGN KEY (`players_userName`)
    REFERENCES `yatzy`.`players` (`userName`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
