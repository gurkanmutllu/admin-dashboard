export abstract class BaseService<T> {
  protected items: T[] = [];
  protected isLoaded = false;
  protected abstract endpoint: string;

  protected async fetchData(): Promise<T[]> {
    if (!this.isLoaded) {
      try {
        const response = await fetch(this.endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.items = await response.json();
        this.isLoaded = true;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    }
    return this.items;
  }

  protected reset(): void {
    this.items = [];
    this.isLoaded = false;
  }
}
