import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Router, UrlTree } from '@angular/router';
import { authGuard, memberAdminGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('auth guards (dummy mode)', () => {
    beforeEach(() => {
        sessionStorage.removeItem('ttt-dev-login');
        TestBed.configureTestingModule({
            providers: [provideHttpClient()],
        });
    });

    afterEach(() => {
        sessionStorage.removeItem('ttt-dev-login');
    });

    function runGuard(guard: typeof authGuard): boolean | UrlTree {
        return TestBed.runInInjectionContext(() => guard({} as never, {} as never)) as boolean | UrlTree;
    }

    it('authGuard should redirect anonymous visitors to home', () => {
        const result = runGuard(authGuard);
        expect(result instanceof UrlTree).toBeTrue();
        expect(result.toString()).toBe('/');
    });

    it('authGuard should allow authenticated users', () => {
        TestBed.inject(AuthService).login();
        expect(runGuard(authGuard)).toBeTrue();
    });

    it('memberAdminGuard should allow users with member management roles', () => {
        TestBed.inject(AuthService).login();
        expect(runGuard(memberAdminGuard)).toBeTrue();
    });

    it('memberAdminGuard should redirect users without roles to the profile', () => {
        // dev user has PERSONAL role, so only the anonymous case is verifiable here
        const result = runGuard(memberAdminGuard);
        expect(result instanceof UrlTree).toBeTrue();
        expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe('/intern');
    });
});
