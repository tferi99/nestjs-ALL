import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { GUARDS_METADATA, INTERCEPTORS_METADATA } from '@nestjs/common/constants';
import { ENABLE_GUARD_CONFIGS_KEY, GuardConfig } from '../../grd/decorators/enable-guard.decorator';

@Injectable()
export class MetadataDumpGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const clazz = ctx.getClass();
    const handler = ctx.getHandler();
    console.log(`=== MetadataDumpGuard: ${clazz.name}.${handler.name}() ===`);

    // class
    MetadataDumpGuard.printClassMetadata(clazz);

    // method
    MetadataDumpGuard.printHandlerMetadata(handler);

    console.log('--------------------------------------');
    return true;
  }

  //----------------------------- utils -----------------------------
  public static printClassMetadata(clazz: any) {
    console.log('Class:');
    const classKeys = Reflect.getMetadataKeys(clazz);
    classKeys.forEach((key) => console.log('  - [' + key + ']: ' + Reflect.getMetadata(key, clazz)));
  }

  public static printHandlerMetadata(handler: any) {
    console.log('Method:');
    const methodKeys = Reflect.getMetadataKeys(handler);
    methodKeys.forEach((key) => {
      if (!this.handleBuiltInMetadata(key, handler)) {
        this.printMetadata(key, Reflect.getMetadata(key, handler));
      }
    });
  }

  //----------------------------- helpers -----------------------------
  private static handleBuiltInMetadata(key: any, target: any): boolean {
    if (key === GUARDS_METADATA) {
      this.printGuardsMetadata(key, target);
      return true;
    } else if (key === INTERCEPTORS_METADATA) {
      this.printInterceptorMetadata(key, target);
      return true;
    } else if (key == ENABLE_GUARD_CONFIGS_KEY) {
      this.printEnableGuardMetadata(key, target);
      return true;
    }
    return false;
  }

  private static printMetadata(key: any, value: any) {
    console.log('  - [' + key + ']: ' + value);
  }

  private static printGuardsMetadata(key: any, target: any): void {
    this.printMetadataList(key, target, 'Guards');
  }

  private static printInterceptorMetadata(key: any, target: any): void {
    this.printMetadataList(key, target, 'Interceptors');
  }

  private static printMetadataList(key: any, target: any, label: string): void {
    const items = Reflect.getMetadata(key, target);
    let val = label + '[';
    let first = true;
    items.forEach((intr) => {
      val += first ? intr.name : ', ' + intr.name;
      first = false;
    });
    val += ']';
    this.printMetadata(key, val);
  }

  private static printEnableGuardMetadata(key: any, target: any) {
    const data: Map<string, GuardConfig> = Reflect.getMetadata(key, target);
    this.printMetadata(key, '...');
    console.log('    ...', data);
  }
}
