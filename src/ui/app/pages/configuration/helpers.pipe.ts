

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "ObjNgFor",  pure: false })
export class ObjNgFor implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.keys(value);
    }
}


@Pipe({name: "camelsplit"})
export class CamelSplit implements PipeTransform {

    transform(text: any, chars: string = "\\s"): string {
        return isString(text)
            ? text.trim()
                //.replace(/\s+/g, "")
                .replace(/[A-Z]/g, (c: string, k: any) => {
                    return k ? ` ${c}` : c.toLowerCase()
                })
            : text;
    }
}



export function isString(value: any) {
    return typeof value === "string";
}