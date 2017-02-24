/**
 * Start component
 */

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app',
    template: `
        <div class="card card-inverse card-primary mb-3 text-center">
            <div class="card-block">
                <h1>Weather with Angular 2.</h1>
            </div>
        </div>
        <home></home>
    `,
})
export class AppComponent{}