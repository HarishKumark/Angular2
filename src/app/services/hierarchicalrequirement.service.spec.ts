import { TestBed } from '@angular/core/testing';

import { HierarchicalrequirementService } from './hierarchicalrequirement.service';

describe('HierarchicalrequirementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HierarchicalrequirementService = TestBed.get(HierarchicalrequirementService);
    expect(service).toBeTruthy();
  });
});
