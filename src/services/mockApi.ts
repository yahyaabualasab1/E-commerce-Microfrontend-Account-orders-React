const defaultDelay = 350;

export function cloneMock<T>(value: T): T {
  return structuredClone(value);
}

export function resolveMock<T>(value: T, delay = defaultDelay): Promise<T> {
  return new Promise((resolve) => {
    globalThis.setTimeout(() => resolve(cloneMock(value)), delay);
  });
}

export function rejectMock(error: Error, delay = defaultDelay): Promise<never> {
  return new Promise((_, reject) => {
    globalThis.setTimeout(() => reject(error), delay);
  });
}
