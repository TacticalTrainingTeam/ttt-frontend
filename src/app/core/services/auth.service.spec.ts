import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService (dummy mode)', () => {
    let service: AuthService;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(() => {
        sessionStorage.removeItem('ttt-dev-login');
        routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), { provide: Router, useValue: routerSpy }],
        });
        service = TestBed.inject(AuthService);
    });

    afterEach(() => {
        sessionStorage.removeItem('ttt-dev-login');
    });

    it('should start logged out', () => {
        expect(service.isAuthenticated()).toBeFalse();
        expect(service.currentUser()).toBeNull();
        expect(service.canManageMembers()).toBeFalse();
    });

    it('should log in as the dev user, persist the session and redirect to the intern area', () => {
        service.login();

        expect(service.isAuthenticated()).toBeTrue();
        expect(service.currentUser()?.name).toBe('Menom');
        expect(service.hasRole('MEMBER')).toBeTrue();
        expect(service.canManageMembers()).toBeTrue();
        expect(sessionStorage.getItem('ttt-dev-login')).toBe('1');
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/intern']);
    });

    it('should clear the session on logout and redirect to home', () => {
        service.login();

        service.logout();

        expect(service.isAuthenticated()).toBeFalse();
        expect(sessionStorage.getItem('ttt-dev-login')).toBeNull();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });
});
