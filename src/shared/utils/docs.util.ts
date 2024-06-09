import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

export class DocumentationUtils {
  private title = "crud-manager-product Service";
  private version = "1";
  private description = `crud-manager-product Service API Documentation`;

  async config(app: any) {
    const config = new DocumentBuilder()
      .setTitle(this.title)
      .setDescription(this.description)
      .setVersion(this.version)
      .addBearerAuth();

    const document = SwaggerModule.createDocument(app, config.build());

    SwaggerModule.setup("/docs", app, document);
  }
}
