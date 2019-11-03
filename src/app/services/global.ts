import { isDevMode } from '@angular/core';

export var global = {
    url: (isDevMode) ?
        'http://127.0.0.1:8000' :
        'https://api-almacen-symfony.herokuapp.com'
}