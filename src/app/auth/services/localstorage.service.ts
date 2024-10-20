import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private isBrowser: boolean;
  private inMemoryStorage: { [key: string]: string } = {};

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    } else {
      this.inMemoryStorage[key] = value;
    }
  }

  getItem(key: string): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(key);
    } else {
      return this.inMemoryStorage[key] || null;
    }
  }

  removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    } else {
      delete this.inMemoryStorage[key];
    }
  }

  clear(): void {
    if (this.isBrowser) {
      localStorage.clear();
    } else {
      this.inMemoryStorage = {};
    }
  }
}
