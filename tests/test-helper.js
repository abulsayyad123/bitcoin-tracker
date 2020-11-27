import Application from 'coin-tracker/app';
import config from 'coin-tracker/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
