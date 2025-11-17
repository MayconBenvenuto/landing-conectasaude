# Configuração de Testes

Este projeto ainda não possui testes automatizados configurados. 

## Próximos passos recomendados:

### 1. Instalar dependências de teste

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
```

### 2. Criar arquivo de configuração `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

### 3. Criar arquivo de setup `vitest.setup.ts`

```typescript
import '@testing-library/jest-dom';
```

### 4. Adicionar scripts ao package.json

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### 5. Testes prioritários para implementar:

#### a) Sistema de Loading Splash (CRÍTICO)
- `components/__tests__/ui/loading-splash.test.tsx`
- Testar callbacks `onLoadingComplete()` e `isLoadingFinished()`
- Verificar hidratação e timing

#### b) Formulário de Lead
- `components/__tests__/lead-form-section.test.tsx`
- Validação client-side
- Proteção honeypot
- Estados de sucesso/erro

#### c) API de Lead
- `app/api/__tests__/lead/route.test.ts`
- Validação de campos
- Detecção de spam
- Fallback de SMTP

#### d) Componentes de Animação
- `components/__tests__/BlurText.test.tsx`
- `components/__tests__/RotatingText.test.tsx`
- Coordenação com loading splash
- Hydration mismatch prevention

## Exemplo de teste básico

```typescript
// components/__tests__/ui/logo.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Logo from '@/components/ui/logo';

describe('Logo Component', () => {
  it('renderiza o logo corretamente', () => {
    render(<Logo />);
    const logo = screen.getByAltText(/belz conecta saúde/i);
    expect(logo).toBeInTheDocument();
  });

  it('tem link para página inicial', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });
});
```

## Coverage mínimo recomendado

- **Sistema crítico de animações**: 90%+
- **Formulários e validação**: 80%+
- **API routes**: 85%+
- **Componentes UI básicos**: 70%+
